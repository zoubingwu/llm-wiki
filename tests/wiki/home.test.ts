import { describe, expect, it } from "vitest";
import { pickFeaturedConcepts, parseRecentLogEntries, sortLatestArticles } from "../../src/lib/wiki/home";

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
        { title: "Published Earlier", published: "2026-04-20", mtime: 10 },
        { title: "Archived Later", created: "2026-04-22", published: "2020-01-01", mtime: 1 }
      ])[0]?.title
    ).toBe("Archived Later");
  });
});
