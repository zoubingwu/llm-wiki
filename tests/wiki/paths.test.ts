import { describe, expect, it } from "vitest";
import { assetUrl, pageUrl, stripMarkdownExtension } from "../../src/lib/wiki/paths";

describe("wiki paths", () => {
  it("preserves file titles in wiki urls", () => {
    expect(pageUrl("wiki", "Context Engineering")).toBe("/wiki/Context%20Engineering/");
    expect(pageUrl("articles", "音频可视化：采样、频率和傅里叶变换")).toBe(
      "/articles/%E9%9F%B3%E9%A2%91%E5%8F%AF%E8%A7%86%E5%8C%96%EF%BC%9A%E9%87%87%E6%A0%B7%E3%80%81%E9%A2%91%E7%8E%87%E5%92%8C%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2/"
    );
    expect(assetUrl("ModalNet-21.png")).toBe("/assets/wiki/ModalNet-21.png");
    expect(stripMarkdownExtension("Context Engineering.md")).toBe("Context Engineering");
  });
});
