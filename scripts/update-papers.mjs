// Adds new papers from arXiv and DBLP to src/content/papers, and upgrades
// arXiv preprints to their published version once DBLP lists one.
// Usage: node scripts/update-papers.mjs   (prints what changed; exit code 0)

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const CONFIG = {
  name: "Federico Torrielli",
  dir: "src/content/papers",
  arxiv: "https://export.arxiv.org/api/query?search_query=au:%22Federico%20Torrielli%22&sortBy=submittedDate&sortOrder=descending&max_results=50",
  dblp: "https://dblp.federicotorrielli.me/search/publ/api?q=Federico%20Torrielli&format=json&h=1000",
  dblpBib: (key) => `https://dblp.federicotorrielli.me/rec/${key}.bib`,
};

// ---------- pure helpers ----------

export const norm = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g, "");

export const slugOf = (title) =>
  title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean).slice(0, 6).join("-");

const list = (x) => (x === undefined ? [] : Array.isArray(x) ? x : [x]);
const clean = (s) => s.replace(/\s+/g, " ").trim();
const decode = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const yaml = (s) => JSON.stringify(s);

export function parseArxiv(xml) {
  const tag = (block, name) => decode(clean(block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? ""));
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
    const id = tag(e, "id").replace(/^https?:\/\/arxiv\.org\/abs\//, "").replace(/v\d+$/, "");
    return {
      source: "arxiv",
      id,
      title: tag(e, "title"),
      date: tag(e, "published").slice(0, 10),
      authors: [...e.matchAll(/<name>([\s\S]*?)<\/name>/g)].map(([, n]) => decode(clean(n))),
      abstract: tag(e, "summary").replace(/\$([^$]+)\$/g, "$1"),
      category: e.match(/<arxiv:primary_category[^>]*term="([^"]+)"/)?.[1] ?? "cs.CL",
      doi: tag(e, "arxiv:doi").toLowerCase() || undefined,
    };
  });
}

export function parseDblp(json) {
  return list(json?.result?.hits?.hit)
    .map(({ info }) => ({
      source: "dblp",
      key: info.key,
      type: info.type,
      title: clean(info.title).replace(/\.$/, ""),
      year: info.year,
      venue: Array.isArray(info.venue) ? info.venue[0] : info.venue,
      doi: info.doi,
      authors: list(info.authors?.author).map((a) => a.text.replace(/ \d{4}$/, "")),
    }))
    .filter((p) => p.type !== "Editorship" && !p.key.startsWith("journals/corr/"));
}

export function parseExisting(files) {
  return files.map(({ slug, text }) => ({
    slug,
    text,
    title: text.match(/^title: "(.*)"$/m)?.[1] ?? "",
    preprint: /Text: "arXiv Preprint"/.test(text),
    arxivId: text.match(/arxiv\.org\/abs\/(\d{4}\.\d{4,5})/)?.[1],
    doi: text.match(/doi\.org\/(10\.[^)\s"]+)/i)?.[1]?.toLowerCase(),
  }));
}

const isMine = (p, name) => p.authors.includes(name);

export function plan(existing, arxiv, dblp, name) {
  const titles = new Map(existing.map((e) => [norm(e.title), e]));
  const arxivIds = new Set(existing.map((e) => e.arxivId).filter(Boolean));
  const dois = new Set(existing.map((e) => e.doi).filter(Boolean));

  const newArxiv = arxiv.filter(
    (p) => isMine(p, name) && !arxivIds.has(p.id) && !titles.has(norm(p.title)) && !(p.doi && dois.has(p.doi)),
  );
  const known = new Set([...titles.keys(), ...newArxiv.map((p) => norm(p.title))]);
  const published = dblp.filter((p) => isMine(p, name) && p.doi);
  const upgrades = published
    .map((p) => ({ paper: p, entry: titles.get(norm(p.title)) }))
    .filter(({ paper, entry }) => entry?.preprint && !dois.has(paper.doi.toLowerCase()));
  const newDblp = published.filter((p) => !known.has(norm(p.title)) && !dois.has(p.doi.toLowerCase()));
  return { newArxiv, newDblp, upgrades };
}

// ---------- rendering ----------

const authorList = (authors) => authors.map(yaml).join(", ");

export function renderArxiv(p) {
  const url = `https://arxiv.org/abs/${p.id}`;
  const doi = `10.48550/arXiv.${p.id}`;
  return `---
title: ${yaml(p.title)}
date: ${p.date}
tags: []
author: [${authorList(p.authors)}]
description: ${yaml(`${p.title}. Preprint on arXiv.`)}
editPost:
  URL: "${url}"
  Text: "arXiv Preprint"
---

## Abstract

${p.abstract}

---

## Citation

${p.authors.join(", ")}, "${p.title}," _arXiv preprint arXiv:${p.id}_, ${p.date.slice(0, 4)}. DOI: [${doi}](https://doi.org/${doi})

\`\`\`bibtex
@misc{${slugOf(p.title).replace(/-/g, "")}${p.date.slice(0, 4)},
 title        = {${p.title}},
 author       = {${p.authors.join(" and ")}},
 year         = ${p.date.slice(0, 4)},
 eprint       = {${p.id}},
 archivePrefix = {arXiv},
 primaryClass = {${p.category}},
 doi          = {${doi}},
 url          = {${url}}
}
\`\`\`

---

## Links

- [Paper (arXiv)](${url})
- [PDF](https://arxiv.org/pdf/${p.id})
- [DOI](https://doi.org/${doi})
`;
}

export function renderDblp(p, bibtex) {
  const url = `https://doi.org/${p.doi}`;
  return `---
title: ${yaml(p.title)}
date: ${p.year}-01-01
tags: []
author: [${authorList(p.authors)}]
description: ${yaml(`${p.title}. Published in ${p.venue}.`)}
editPost:
  URL: "${url}"
  Text: ${yaml(p.venue)}
---

## Citation

${p.authors.join(", ")}, "${p.title}," _${p.venue}_, ${p.year}. DOI: [${p.doi}](${url})

\`\`\`bibtex
${bibtex.trim()}
\`\`\`

---

## Links

- [Paper (DOI)](${url})
`;
}

export function upgrade(text, p) {
  const url = `https://doi.org/${p.doi}`;
  return text
    .replace(/  URL: ".*"\n  Text: "arXiv Preprint"/, `  URL: "${url}"\n  Text: ${yaml(p.venue)}`)
    .replace(/## Links\n\n/, `## Links\n\n- [Published version (DOI)](${url})\n`);
}

// ---------- I/O at the edge ----------

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "paper-list-updater" } });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
}

async function readExisting(dir) {
  const slugs = (await readdir(dir, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
  return Promise.all(slugs.map(async (slug) => ({ slug, text: await readFile(join(dir, slug, "index.md"), "utf8") })));
}

async function write(dir, slug, text) {
  await mkdir(join(dir, slug), { recursive: true });
  await writeFile(join(dir, slug, "index.md"), text);
}

async function main(cfg) {
  const existing = parseExisting(await readExisting(cfg.dir));
  const arxiv = parseArxiv(await fetchText(cfg.arxiv));
  const dblp = parseDblp(JSON.parse(await fetchText(cfg.dblp)));
  const { newArxiv, newDblp, upgrades } = plan(existing, arxiv, dblp, cfg.name);

  for (const p of newArxiv) await write(cfg.dir, slugOf(p.title), renderArxiv(p));
  for (const p of newDblp) await write(cfg.dir, slugOf(p.title), renderDblp(p, await fetchText(cfg.dblpBib(p.key))));
  for (const { paper, entry } of upgrades) await write(cfg.dir, entry.slug, upgrade(entry.text, paper));

  const log = [
    ...newArxiv.map((p) => `new (arXiv): ${p.title}`),
    ...newDblp.map((p) => `new (DBLP): ${p.title}`),
    ...upgrades.map(({ paper, entry }) => `published: ${entry.slug} -> ${paper.venue}`),
  ];
  console.log(log.length ? log.join("\n") : "no changes");
}

if (import.meta.url === `file://${process.argv[1]}`) await main(CONFIG);
