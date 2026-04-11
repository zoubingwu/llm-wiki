---
type: concept
created: 2026-04-11
updated: 2026-04-11
tags:
  - graphics
  - rendering
  - ui
source_count: 1
---

# Specular Highlight

镜面高光（Specular Highlight）是物体表面在特定光照方向下出现的明亮反光区域。对玻璃、塑料和金属这类高反射材质来说，它常常决定了“材质感”是否成立。

## 在 Liquid Glass 里的角色

在这篇文章的实现里，[[Liquid Glass Effect]] 不只依赖 [[Refraction|折射]]。如果只有背景位移，效果更像扭曲的透明层；加入镜面高光后，才更接近“有厚度的玻璃边缘”。

## 文章中的近似方法

作者把它近似成一种边缘光（rim light）：

- 高光主要出现在玻璃边缘
- 强度由表面法线和固定光照方向的夹角决定
- 最终作为独立图层与折射结果混合

这不是严格物理渲染，但很适合浏览器里的实时 UI 效果。

## 与折射的组合方式

文章先生成一张折射位移图，再单独生成高光图层，最后通过 `<feBlend />` 把高光覆盖到折射结果上。

这也意味着高光部分更偏视觉设计，可以通过滤镜数量和参数调整出不同观感，而不必完全服从物理正确性。

## 相关概念

- [[Liquid Glass Effect]]
- [[Refraction]]
- [[SVG Displacement Map]]
