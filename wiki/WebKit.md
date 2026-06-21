---
type: entity
created: 2026-06-21
updated: 2026-06-21
tags:
  - browser
  - rendering
  - engine
source_count: 2
---

# WebKit

WebKit 是 Safari 和 Apple 平台系统 WebView 的浏览器引擎。[[How modern browsers work]] 将它与 [[Chromium]] / [[Blink]]、[[Gecko]] 对比，说明现代浏览器在相同 Web 标准目标下的内部实现差异。

## 关键特征

- WebKit2 将 UI process 和 WebContent process 分离，网页内容运行在受限进程中。
- Safari 在 macOS 和 iOS 上使用 Core Animation / CALayer 组织合成和 GPU 输出。
- WebKit 的样式系统与 Blink 有共同历史，Blink 于 2013 年从 WebKit 分叉。
- JavaScriptCore 是 WebKit 的 JavaScript 引擎，包含 LLInt、Baseline、DFG 和 FTL 等执行层级。

## 在当前 wiki 中的位置

[[A Technical Deep Dive Into the New Raycast]] 把系统 WebKit 作为 macOS hybrid native WebView 架构的基础。[[Native-feel WebView Desktop Apps]] 记录了 WebKit 在窗口显示、动画 timer、presentation update、emoji 字体和渲染节流上的桌面应用约束。

## 关联页面

- [[Browser Engine Comparison]]
- [[Modern Browser Architecture]]
- [[Site Isolation]]
- [[Native-feel WebView Desktop Apps]]
- [[A Technical Deep Dive Into the New Raycast]]
- [[Gecko]]
- [[Blink]]
