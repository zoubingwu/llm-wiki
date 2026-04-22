import type { PageRecord, Registry, WikiCollectionName } from "./types";
import { resolvePage } from "./registry";
import { pageUrl } from "./paths";

const LINK_RE = /(?<!!)\[\[([^[\]|]+)(?:\|([^[\]]+))?\]\]/g;

export interface GraphInput {
  title: string;
  collection: WikiCollectionName;
  type?: string;
  body: string;
}

export interface GraphEntry extends PageRecord {
  type?: string;
}

export interface GraphNode {
  outgoing: GraphEntry[];
  backlinks: GraphEntry[];
  sources: GraphEntry[];
  related: GraphEntry[];
}

export function graphKey({ title, collection }: Pick<PageRecord, "title" | "collection">): string {
  return `${collection}\u0000${title}`;
}

function dedupe(entries: GraphEntry[]): GraphEntry[] {
  const out = new Map<string, GraphEntry>();

  for (const entry of entries) {
    out.set(graphKey(entry), entry);
  }

  return [...out.values()];
}

function outgoingLinks(
  body: string,
  registry: Registry,
  typeByIdentity: Map<string, string | undefined>
): GraphEntry[] {
  const links: GraphEntry[] = [];

  for (const match of body.matchAll(LINK_RE)) {
    const title = match[1].trim();
    const target = resolvePage(registry, title);
    if (!target) continue;

    links.push({
      ...target,
      type: typeByIdentity.get(graphKey(target))
    });
  }

  return dedupe(links);
}

function toGraphEntry(input: GraphInput, typeByIdentity: Map<string, string | undefined>): GraphEntry {
  return {
    title: input.title,
    collection: input.collection,
    url: pageUrl(input.collection, input.title),
    type: typeByIdentity.get(graphKey(input))
  };
}

export function buildLinkGraph(inputs: GraphInput[], registry: Registry): Map<string, GraphNode> {
  const graph = new Map<string, GraphNode>();
  const typeByIdentity = new Map<string, string | undefined>();

  for (const input of inputs) {
    const key = graphKey(input);
    typeByIdentity.set(key, input.type);
  }

  for (const input of inputs) {
    const outgoing = outgoingLinks(input.body, registry, typeByIdentity);
    const sources = outgoing.filter((entry) => entry.type === "source" || entry.collection === "articles");
    const node: GraphNode = {
      outgoing,
      backlinks: [],
      sources,
      related: [...outgoing]
    };
    graph.set(graphKey(input), node);
  }

  for (const input of inputs) {
    const source = toGraphEntry(input, typeByIdentity);
    const fromNode = graph.get(graphKey(input));
    if (!fromNode) continue;

    for (const target of fromNode.outgoing) {
      const toNode = graph.get(graphKey(target));
      if (!toNode) continue;

      toNode.backlinks = dedupe([...toNode.backlinks, source]);
    }
  }

  for (const [, node] of graph) {
    if (!node) continue;
    node.related = dedupe([...node.related, ...node.backlinks]).filter(
      (entry) => entry.type !== "source" && entry.collection === "wiki"
    );
  }

  return graph;
}
