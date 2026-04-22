import { getCollection } from "astro:content";
import { basename } from "node:path";
import { pageUrl } from "../lib/wiki/paths";

export const prerender = true;

function fileTitle(entry: { id: string; filePath?: string }) {
  return entry.filePath ? basename(entry.filePath, ".md") : entry.id;
}

export async function GET() {
  const wikiEntries = await getCollection("wiki");
  const urls = ["/", ...wikiEntries.map((entry) => pageUrl("wiki", fileTitle(entry)))];
  const base = "https://wiki.zoubingwu.com";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${new URL(path, base).toString()}</loc></url>`).join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
