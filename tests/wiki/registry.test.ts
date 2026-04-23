import { describe, expect, it } from "vitest";
import { buildRegistry, resolveAsset, resolvePage } from "../../src/lib/wiki/registry";

describe("wiki registry", () => {
  it("indexes markdown titles and supports normalized lookups", () => {
    const registry = buildRegistry(process.cwd());

    expect(resolvePage(registry, "Context Engineering")?.url).toBe("/wiki/Context%20Engineering/");
    expect(resolvePage(registry, "Attention Is All You Need")?.url).toBe("/wiki/Attention%20Is%20All%20You%20Need/");
    expect(resolvePage(registry, "Hooke’s Law")?.url).toBe("/wiki/Hooke's%20Law/");
    expect(resolveAsset(registry, "ModalNet-21.png")).toBe("/assets/wiki/ModalNet-21.png");
  });
});
