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

# Blink

Blink 是 [[Chromium]] 的渲染引擎，负责把 HTML、CSS、DOM 和样式变化转成布局、绘制与合成输入。它从 WebKit 分叉而来，成为 Chromium 生态中页面渲染的核心组件。

## 工作范围

[[How modern browsers work]] 中的 Blink 负责 [[Browser Rendering Pipeline]] 的大部分阶段：

- HTML parser 构建 DOM。
- CSS parser 构建 CSSOM。
- style engine 计算 computed style。
- layout 生成元素尺寸和位置。
- paint 生成 paint records 或 display list。
- compositor 组织 layers、tiles 和 compositor frame。

Blink 与 [[V8 JavaScript Engine]] 通过 bindings 连接，让 JavaScript 可以调用 DOM 和 Web API。

## 对比关系

在 [[Browser Engine Comparison]] 中，Blink 与 [[Gecko]]、[[WebKit]] 的核心差异集中在样式计算并行化、图形管线和进程模型实现。Blink 使用 Chromium 的多进程基础设施与 GPU process 协作。

## 关联页面

- [[Chromium]]
- [[Browser Rendering Pipeline]]
- [[V8 JavaScript Engine]]
- [[Browser Engine Comparison]]
