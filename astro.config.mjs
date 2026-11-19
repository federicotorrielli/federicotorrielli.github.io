import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://federicotorrielli.me",
  trailingSlash: "always",
  integrations: [sitemap({ filter: (page) => !page.includes("/tags/") })],
  redirects: { "/archive": "/papers/", "/search": "/papers/" },
  markdown: { shikiConfig: { theme: "rose-pine-dawn" } },
});
