import { defineConfig } from "astro/config";
import { rehypeWikiLinks, remarkWikiLinks } from "./src/lib/wiki/wikilinks";

export default defineConfig({
  site: "https://wiki.zoubingwu.com",
  markdown: {
    remarkPlugins: [remarkWikiLinks],
    rehypePlugins: [rehypeWikiLinks]
  }
});
