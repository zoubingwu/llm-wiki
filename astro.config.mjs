import { defineConfig } from "astro/config";
import { remarkWikiLinks } from "./src/lib/wiki/wikilinks";

export default defineConfig({
  site: "https://example.com",
  markdown: {
    remarkPlugins: [remarkWikiLinks]
  }
});
