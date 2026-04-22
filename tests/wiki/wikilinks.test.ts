import { describe, expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { remarkWikiLinks } from "../../src/lib/wiki/wikilinks";

async function render(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkWikiLinks)
    .use(remarkStringify)
    .process(markdown);

  return String(file);
}

describe("remarkWikiLinks", () => {
  it("rewrites links, aliases, and embeds", async () => {
    await expect(render("[[Context Engineering]]")).resolves.toContain(
      "[Context Engineering](/wiki/Context%20Engineering/)"
    );
    await expect(render("[source](../articles/A%20Guide%20to%20Context%20Engineering%20for%20LLMs.md)")).resolves.toContain(
      "[source](/articles/A%20Guide%20to%20Context%20Engineering%20for%20LLMs/)"
    );
    await expect(render("[[Context Engineering|上下文工程]]")).resolves.toContain(
      "[上下文工程](/wiki/Context%20Engineering/)"
    );
    await expect(render("![[ModalNet-21.png]]")).resolves.toContain(
      "![](/assets/wiki/ModalNet-21.png)"
    );
  });

  it("leaves unresolved wikilinks as text", async () => {
    await expect(render("[[Prototype]]")).resolves.toContain("\\[\\[Prototype]]");
  });
});
