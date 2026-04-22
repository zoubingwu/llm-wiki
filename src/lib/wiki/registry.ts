import { readdirSync } from "node:fs";
import { join } from "node:path";
import { assetUrl, pageUrl, stripMarkdownExtension } from "./paths";
import type { PageRecord, Registry, WikiCollectionName } from "./types";

function readMarkdownTitles(root: string, collection: WikiCollectionName): PageRecord[] {
  const folder = join(root, collection);

  return readdirSync(folder)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const title = stripMarkdownExtension(name);
      return {
        title,
        collection,
        url: pageUrl(collection, title)
      };
    });
}

export function buildRegistry(root: string): Registry {
  const pages = new Map<string, PageRecord>();
  const assets = new Map<string, string>();

  for (const page of [...readMarkdownTitles(root, "articles"), ...readMarkdownTitles(root, "wiki")]) {
    pages.set(page.title, page);
  }

  for (const filename of readdirSync(join(root, "raw/assets"))) {
    assets.set(filename, assetUrl(filename));
  }

  return { pages, assets };
}

export function resolvePage(registry: Registry, title: string): PageRecord | null {
  return registry.pages.get(title) ?? null;
}

export function resolveAsset(registry: Registry, filename: string): string | null {
  return registry.assets.get(filename) ?? null;
}
