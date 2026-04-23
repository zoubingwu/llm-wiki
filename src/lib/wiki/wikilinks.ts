import { visit } from "unist-util-visit";
import { buildRegistry, resolveAsset, resolvePage } from "./registry";
import { pageUrl } from "./paths";
import type { WikiCollectionName } from "./types";

const registry = buildRegistry(process.cwd());

interface TextNode {
  type: "text";
  value: string;
}

interface LinkNode {
  type: "link";
  url: string;
  children: Array<{ type: "text"; value: string }>;
}

interface ImageNode {
  type: "image";
  url: string;
  alt: string;
}

type MarkdownNode = TextNode | LinkNode | ImageNode;

type FileLike = { message: (reason: string) => void };

function rewriteMarkdownUrl(url: string): string | null {
  const match = url.match(/^\.\.\/(wiki|articles)\/(.+?)\.md$/);
  if (!match) return null;

  const collection = match[1] as WikiCollectionName;
  const title = decodeURIComponent(match[2]);
  return pageUrl(collection, title);
}

function toNodes(value: string, file: FileLike): MarkdownNode[] {
  const nodes: MarkdownNode[] = [];
  let lastIndex = 0;
  const wikilinkRe = /(!)?\[\[([^[\]|]+)(?:\|([^[\]]+))?\]\]/g;

  for (const match of value.matchAll(wikilinkRe)) {
    const full = match[0];
    const isEmbed = Boolean(match[1]);
    const target = match[2].trim();
    const alias = match[3]?.trim();
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push({ type: "text", value: value.slice(lastIndex, index) });
    }

    if (isEmbed) {
      const url = resolveAsset(registry, target);
      if (url) {
        nodes.push({ type: "image", url, alt: alias ?? "" });
      } else {
        file.message(`Unresolved embed: ${target}`);
        nodes.push({ type: "text", value: full });
      }
    } else {
      const page = resolvePage(registry, target);
      if (page) {
        nodes.push({
          type: "link",
          url: page.url,
          children: [{ type: "text", value: alias ?? target }]
        });
      } else {
        file.message(`Unresolved wikilink: ${target}`);
        nodes.push({ type: "text", value: full });
      }
    }

    lastIndex = index + full.length;
  }

  if (lastIndex < value.length) {
    nodes.push({ type: "text", value: value.slice(lastIndex) });
  }

  return nodes.length === 0 ? [{ type: "text", value }] : nodes;
}

export function remarkWikiLinks() {
  return (tree: any, file: FileLike) => {
    visit(tree, "link", (node: { url: string }) => {
      const rewritten = rewriteMarkdownUrl(node.url);
      if (rewritten) {
        node.url = rewritten;
      }
    });

    visit(tree, "text", (node: TextNode, index, parent) => {
      if (!parent || typeof index !== "number") return;
      if (!node.value.includes("[[")) return;

      const replacements = toNodes(node.value, file);
      parent.children.splice(index, 1, ...replacements);
      return index + replacements.length;
    });
  };
}

interface HtmlTextNode {
  type: "text";
  value: string;
}

interface HtmlElementNode {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children: HtmlNode[];
}

type HtmlNode = HtmlTextNode | HtmlElementNode;

const HTML_SKIP_TAGS = new Set(["a", "code", "pre", "script", "style"]);

function toHtmlNodes(value: string, file: FileLike): HtmlNode[] {
  const nodes: HtmlNode[] = [];
  let lastIndex = 0;
  const wikilinkRe = /(!)?\[\[([^[\]|]+)(?:\|([^[\]]+))?\]\]/g;

  for (const match of value.matchAll(wikilinkRe)) {
    const full = match[0];
    const isEmbed = Boolean(match[1]);
    const target = match[2].trim();
    const alias = match[3]?.trim();
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push({ type: "text", value: value.slice(lastIndex, index) });
    }

    if (isEmbed) {
      const url = resolveAsset(registry, target);
      if (url) {
        nodes.push({
          type: "element",
          tagName: "img",
          properties: {
            src: url,
            alt: alias ?? ""
          },
          children: []
        });
      } else {
        file.message(`Unresolved embed: ${target}`);
        nodes.push({ type: "text", value: full });
      }
    } else {
      const page = resolvePage(registry, target);
      if (page) {
        nodes.push({
          type: "element",
          tagName: "a",
          properties: {
            href: page.url
          },
          children: [{ type: "text", value: alias ?? target }]
        });
      } else {
        file.message(`Unresolved wikilink: ${target}`);
        nodes.push({ type: "text", value: full });
      }
    }

    lastIndex = index + full.length;
  }

  if (lastIndex < value.length) {
    nodes.push({ type: "text", value: value.slice(lastIndex) });
  }

  return nodes.length === 0 ? [{ type: "text", value }] : nodes;
}

export function rehypeWikiLinks() {
  return (tree: any, file: FileLike) => {
    visit(tree, "text", (node: HtmlTextNode, index, parent: HtmlElementNode | undefined) => {
      if (!parent || typeof index !== "number") return;
      if (parent.type === "element" && HTML_SKIP_TAGS.has(parent.tagName)) return;
      if (!node.value.includes("[[")) return;

      const replacements = toHtmlNodes(node.value, file);
      parent.children.splice(index, 1, ...replacements);
      return index + replacements.length;
    });
  };
}
