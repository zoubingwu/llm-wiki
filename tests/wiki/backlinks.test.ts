import { describe, expect, it } from "vitest";
import { buildLinkGraph, graphKey } from "../../src/lib/wiki/backlinks";
import { pageUrl } from "../../src/lib/wiki/paths";
import type { Registry } from "../../src/lib/wiki/types";

describe("link graph", () => {
  it("builds backlinks and source panels from raw markdown", () => {
    const registry: Registry = {
      pages: new Map([
        ["Example A", { title: "Example A", collection: "wiki", url: pageUrl("wiki", "Example A") }],
        ["Example B", { title: "Example B", collection: "wiki", url: pageUrl("wiki", "Example B") }],
        ["Source Page", { title: "Source Page", collection: "wiki", url: pageUrl("wiki", "Source Page") }]
      ]),
      assets: new Map()
    };
    const graph = buildLinkGraph(
      [
        {
          title: "Example A",
          collection: "wiki",
          type: "concept",
          body: "See [[Example B]] and [[Source Page]]."
        },
        {
          title: "Example B",
          collection: "wiki",
          type: "concept",
          body: "Mentions [[Example A]]."
        },
        {
          title: "Source Page",
          collection: "wiki",
          type: "source",
          body: "Summary"
        }
      ],
      registry
    );

    expect(graph.get(graphKey({ collection: "wiki", title: "Example A" }))?.backlinks.map((entry) => entry.title)).toContain("Example B");
    expect(graph.get(graphKey({ collection: "wiki", title: "Example A" }))?.sources.map((entry) => entry.title)).toContain("Source Page");
    expect(graph.get(graphKey({ collection: "wiki", title: "Example A" }))?.related.map((entry) => entry.title)).toContain("Example B");
  });

  it("preserves source identity for duplicate titles across collections", () => {
    const registry: Registry = {
      pages: new Map([
        ["Target", { title: "Target", collection: "wiki", url: pageUrl("wiki", "Target") }],
        ["Source", { title: "Source", collection: "wiki", url: pageUrl("wiki", "Source") }]
      ]),
      assets: new Map()
    };

    const graph = buildLinkGraph(
      [
        {
          title: "Target",
          collection: "wiki",
          body: ""
        },
        {
          title: "Source",
          collection: "wiki",
          body: "[[Target]]"
        },
        {
          title: "Source",
          collection: "articles",
          body: "[[Target]]"
        }
      ],
      registry
    );

    const target = graph.get(graphKey({ collection: "wiki", title: "Target" }));

    expect(target?.backlinks).toHaveLength(2);
    expect(target?.backlinks.map((entry) => entry.url)).toContain("/wiki/Source/");
    expect(target?.backlinks.map((entry) => entry.url)).toContain("/articles/Source/");
    expect(target?.related.map((entry) => entry.url)).toContain("/wiki/Source/");
    expect(target?.related.map((entry) => entry.url)).not.toContain("/articles/Source/");
  });
});
