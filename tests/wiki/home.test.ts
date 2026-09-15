import { describe, expect, it } from "vitest";
import {
  pickFeaturedConcepts,
  parseRecentLogEntries,
  sortLatestArticles,
  sortLatestWikiEntries
} from "../../src/lib/wiki/home";

describe("home data helpers", () => {
  it("derives featured concepts, recent logs, and latest articles", () => {
    const indexBody = `# Wiki Index

## 概念 Pages
- [[Concept A]] — A
- [[Concept B]] — B
- [[Concept C]] — C
`;
    const logBody = `# Wiki Log

## [2026-04-21] query | Question
- two

## [2026-04-22] ingest | Example
- one
`;

    expect(pickFeaturedConcepts(indexBody, 2)).toEqual(["Concept A", "Concept B"]);
    expect(parseRecentLogEntries(logBody, 1)[0]?.title).toContain("2026-04-22");
    expect(
      sortLatestArticles([
        { title: "Published Earlier", published: "2026-04-20" },
        { title: "Archived Later", created: "2026-04-22", published: "2020-01-01" }
      ])[0]?.title
    ).toBe("Archived Later");
  });

  it("sorts articles by date and breaks ties by title", () => {
    const sorted = sortLatestArticles([
      { title: "Zeta", created: "2026-04-22" },
      { title: "Alpha", created: "2026-04-22" },
      { title: "Beta", published: "2026-04-23" },
      { title: "Undated" }
    ]);

    expect(sorted.map((entry) => entry.title)).toEqual(["Beta", "Alpha", "Zeta", "Undated"]);
  });

  it("sorts wiki entries by update date, ignoring mtime and unrelated types", () => {
    const sorted = sortLatestWikiEntries([
      { title: "Older Concept", type: "concept", updated: "2026-04-20" },
      { title: "Zeta Concept", type: "concept", updated: "2026-04-22" },
      { title: "Alpha Concept", type: "concept", updated: "2026-04-22" },
      { title: "Source Page", type: "source", updated: "2026-04-23" }
    ]);

    expect(sorted.map((entry) => entry.title)).toEqual([
      "Alpha Concept",
      "Zeta Concept",
      "Older Concept"
    ]);
  });

  it("produces the same order regardless of the input order", () => {
    const entries = [
      { title: "Second", type: "concept", updated: "2026-04-22" },
      { title: "First", type: "concept", updated: "2026-04-22" },
      { title: "Third", type: "overview", created: "2026-04-21" }
    ];

    const forward = sortLatestWikiEntries(entries).map((entry) => entry.title);
    const backward = sortLatestWikiEntries([...entries].reverse()).map((entry) => entry.title);

    expect(forward).toEqual(["First", "Second", "Third"]);
    expect(backward).toEqual(forward);
  });
});
