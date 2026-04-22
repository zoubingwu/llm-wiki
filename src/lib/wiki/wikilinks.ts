import { visit } from "unist-util-visit";
import { buildRegistry, resolveAsset, resolvePage } from "./registry";

const registry = buildRegistry(process.cwd());
const WIKILINK_RE = /(!)?\[\[([^[\]|]+)(?:\|([^[\]]+))?\]\]/g;

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

function toNodes(value: string, file: FileLike): MarkdownNode[] {
  const nodes: MarkdownNode[] = [];
  let lastIndex = 0;

  for (const match of value.matchAll(WIKILINK_RE)) {
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
    visit(tree, "text", (node: TextNode, index, parent) => {
      if (!parent || typeof index !== "number") return;
      if (!node.value.includes("[[")) return;

      const replacements = toNodes(node.value, file);
      parent.children.splice(index, 1, ...replacements);
      return index + replacements.length;
    });
  };
}
