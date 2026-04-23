import { readdirSync } from "node:fs";
import { join } from "node:path";
import { assetUrl, pageUrl, stripMarkdownExtension } from "./paths";
import type { PageRecord, Registry, WikiCollectionName } from "./types";

const SINGLE_QUOTE_RE = /[\u2018\u2019\u201A\u201B\u2032\u2035\uFF07]/g;
const DOUBLE_QUOTE_RE = /[\u201C\u201D\u201E\u201F\u2033\u2036\uFF02]/g;
const DASH_RE = /[\u2010\u2011\u2012\u2013\u2014\u2015\u2212\uFE58\uFE63\uFF0D]/g;

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

export function normalizePageTitle(value: string): string {
  return value
    .normalize("NFKC")
    .replace(SINGLE_QUOTE_RE, "'")
    .replace(DOUBLE_QUOTE_RE, "\"")
    .replace(DASH_RE, "-")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildRegistry(root: string): Registry {
  const pages = new Map<string, PageRecord>();
  const pageAliases = new Map<string, PageRecord>();
  const assets = new Map<string, string>();

  for (const page of [...readMarkdownTitles(root, "articles"), ...readMarkdownTitles(root, "wiki")]) {
    pages.set(page.title, page);
    pageAliases.set(normalizePageTitle(page.title), page);
  }

  for (const filename of readdirSync(join(root, "raw/assets"))) {
    assets.set(filename, assetUrl(filename));
  }

  return { pages, pageAliases, assets };
}

export function resolvePage(registry: Registry, title: string): PageRecord | null {
  return registry.pages.get(title) ?? registry.pageAliases?.get(normalizePageTitle(title)) ?? null;
}

export function resolveAsset(registry: Registry, filename: string): string | null {
  return registry.assets.get(filename) ?? null;
}
