---
type: entity
created: 2026-06-21
updated: 2026-06-21
tags:
  - browser
  - rendering
  - engine
source_count: 1
---

# Gecko

Gecko 是 Firefox 的浏览器引擎。[[How modern browsers work]] 在比较 [[Chromium]]、Gecko 和 [[WebKit]] 时，把 Gecko 作为并行样式系统、WebRender 和 Fission 站点隔离的代表。

## 关键特征

- Stylo：Firefox Quantum 引入的 Rust CSS engine，可并行计算不同 DOM 子树的样式。
- WebRender：Firefox 默认渲染管线，将 display list 交给 GPU 风格的渲染器处理，适合图形密集页面。
- SpiderMonkey：Firefox 的 JavaScript 引擎，当前使用 Baseline、WarpMonkey 等执行层级。
- Fission：Firefox 的站点隔离项目，让跨站 iframe 和站点内容进入独立内容进程。

## 与其他引擎的关系

[[Browser Engine Comparison]] 将 Gecko 与 [[Blink]]、[[WebKit]] 对比：三者共享 DOM、CSSOM、layout、paint/composite 和多进程安全目标，具体实现分别体现为 Rust 并行样式、Chromium layer/tile 管线和 WebKit/Core Animation 管线。

## 关联页面

- [[Browser Engine Comparison]]
- [[Modern Browser Architecture]]
- [[Site Isolation]]
- [[WebKit]]
- [[Blink]]
