import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { posts, excerpt, postUrl } from "../../lib/blog";

export async function GET(context: APIContext) {
  return rss({
    title: "Federico Torrielli, blog",
    description: "Longer thoughts on AI, alignment, and other things.",
    site: context.site!,
    items: (await posts()).map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: excerpt(p.body ?? ""),
      link: postUrl(p),
    })),
  });
}
