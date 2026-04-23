import { describe, expect, it } from "vitest";
import { findNormalizedTitleCollisions } from "../../src/lib/wiki/registry.ts";

describe("title collision checks", () => {
  it("groups same-collection titles that normalize to the same value", () => {
    const collisions = findNormalizedTitleCollisions([
      {
        collection: "wiki",
        title: "Hooke's Law",
        path: "wiki/Hooke's Law.md"
      },
      {
        collection: "wiki",
        title: "Hooke’s Law",
        path: "wiki/Hooke’s Law.md"
      },
      {
        collection: "wiki",
        title: "RoPE (Rotary Position Embedding)",
        path: "wiki/RoPE (Rotary Position Embedding).md"
      },
      {
        collection: "wiki",
        title: "RoPE （Rotary Position Embedding）",
        path: "wiki/RoPE （Rotary Position Embedding）.md"
      },
      {
        collection: "articles",
        title: "Hooke’s Law",
        path: "articles/Hooke’s Law.md"
      }
    ]);

    expect(collisions).toHaveLength(2);
    expect(collisions[0]).toMatchObject({
      collection: "wiki",
      normalizedTitle: "Hooke's Law"
    });
    expect(collisions[1]).toMatchObject({
      collection: "wiki",
      normalizedTitle: "RoPE (Rotary Position Embedding)"
    });
  });
});
