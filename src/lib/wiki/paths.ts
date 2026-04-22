import type { WikiCollectionName } from "./types";

export function stripMarkdownExtension(filename: string): string {
  return filename.replace(/\.md$/i, "");
}

export function pageUrl(collection: WikiCollectionName, title: string): string {
  return `/${collection}/${encodeURIComponent(title)}/`;
}

export function assetUrl(filename: string): string {
  return `/assets/wiki/${encodeURIComponent(filename)}`;
}
