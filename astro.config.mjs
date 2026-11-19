import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://federicotorrielli.me",
  trailingSlash: "always",
  integrations: [sitemap({ filter: (page) => !page.includes("/tags/") })],
  redirects: { "/archive": "/papers/", "/search": "/papers/" },
  markdown: {
    shikiConfig: { theme: "rose-pine-dawn" },
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
  },
});
