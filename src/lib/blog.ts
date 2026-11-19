import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

export async function posts(): Promise<Post[]> {
  return (await getCollection("blog", (p) => !p.data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const MARKDOWN = /!\[[^\]]*\]\([^)]*\)|\[([^\]]*)\]\([^)]*\)|[*_`>#]|\$[^$]*\$/g;

/** First prose paragraph of a post as plain text, cut at a word boundary. */
export function excerpt(body: string, max = 200): string {
  const para = body.split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !/^(#|```|!\[|\$\$|<|-|\*\s|\d+\.)/.test(p)) ?? "";
  const text = para.replace(MARKDOWN, (_, link) => link ?? "").replace(/\s+/g, " ").trim();
  return text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max))}…`;
}

export const postUrl = (p: Post) => `/blog/posts/${p.id}/`;
