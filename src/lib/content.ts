import { getCollection, type CollectionEntry } from "astro:content";

export type Section = "papers" | "projects" | "courses";
type Entry = CollectionEntry<Section>;

const SELF = /torrielli/i;

export const byDateDesc = (a: Entry, b: Entry) => b.data.date.valueOf() - a.data.date.valueOf();

export async function sorted<S extends Section>(name: S) {
  return (await getCollection(name)).sort(byDateDesc) as CollectionEntry<S>[];
}

export function groupByYear<T extends Entry>(entries: Iterable<T>) {
  const groups = new Map<number, T[]>();
  for (const e of entries) {
    const y = e.data.date.getFullYear();
    groups.set(y, [...(groups.get(y) ?? []), e]);
  }
  return [...groups].sort(([a], [b]) => b - a);
}

export const isSelf = (name: string) => SELF.test(name);

export const isFirstAuthor = (authors: readonly string[]) => authors.length > 0 && isSelf(authors[0]);

/** Venue label from the primary link, e.g. "arXiv Preprint" or "Scientometrics". */
export const venue = (e: Entry) => e.data.editPost?.Text ?? "";

export const isPreprint = (e: Entry) => /arxiv|preprint|openreview/i.test(venue(e));

const THEMES: Record<string, RegExp> = {
  interpretability: /interpretab|activation|verbaliz|autoencoder/i,
  agents: /agent|multi-agent|moltbook|emergent/i,
  safety: /safety|alignment|refusal|injection|misalign|bias/i,
  people: /human|interaction|folk|experience|persona|hci/i,
};

export type Theme = keyof typeof THEMES;
export const themes = Object.keys(THEMES) as Theme[];

export function themesOf(e: Entry): Theme[] {
  const text = [e.data.title, ...e.data.tags].join(" ");
  return themes.filter((t) => THEMES[t].test(text));
}

const GITHUB = /\]\((https:\/\/github\.com\/[^)\s]+)\)/;
const PDF = /\[PDF\]\(([^)\s]+)\)/;

export interface Links { primary?: string; pdf?: string; code?: string }

export function linksOf(e: Entry): Links {
  const body = e.body ?? "";
  return {
    primary: e.data.editPost?.URL,
    pdf: body.match(PDF)?.[1],
    code: body.match(GITHUB)?.[1],
  };
}

export const monthYear = (d: Date) => d.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
