---
type: analysis
created: 2026-06-21
updated: 2026-06-21
tags:
  - browser
  - web-platform
  - comparison
source_count: 1
---

# Browser Engine Comparison

浏览器引擎对比（Browser Engine Comparison）关注 [[Chromium]] / [[Blink]]、[[Gecko]] 和 [[WebKit]] 如何在相同 Web 标准目标下，用不同内部实现完成解析、样式、布局、绘制、合成、JavaScript 执行和进程隔离。

## 共同管线

[[How modern browsers work]] 中的共同抽象是：network → parse → style → layout → paint → raster/composite → JavaScript execution → process/security boundaries。三个主流引擎都围绕 DOM、CSSOM、layout tree、display list 或 layer tree、JS engine、GPU compositor 和 sandbox 构建。

## 关键差异

| 维度 | Chromium / Blink | Gecko | WebKit |
| --- | --- | --- | --- |
| 样式系统 | Blink 使用 C++ 单线程 style engine，配合 incremental invalidation | Stylo 使用 Rust 并行计算 DOM 子树样式 | WebKit 与 Blink 同源，保留单线程 style engine，并探索 CSS selector matching JIT |
| 图形管线 | display list、layers、tiles、raster workers、GPU process 合成 | WebRender 把 display list 交给 GPU 风格的渲染器处理 | macOS / iOS 上借助 Core Animation 和 CALayer 合成 |
| JavaScript 引擎 | V8：Ignition、Sparkplug、Maglev、TurboFan/Turboshaft | SpiderMonkey：Baseline、WarpMonkey、增量/并发 GC | JavaScriptCore：LLInt、Baseline、DFG、FTL，FTL 使用 LLVM |
| 进程模型 | Browser、Renderer、GPU、Network、Utility，站点隔离成熟 | Fission 让跨站 iframe 进入独立内容进程 | WebKit2 用 UI process 和 WebContent process 分离内容 |

## 开发者意义

开发者面对的是统一 Web 平台，底层差异会体现为性能剖面、实现边界、DevTools 能力和新 API 落地节奏。复杂页面、动画、CSS、iframe、安全策略和内存问题都需要在目标引擎中实测。

## 关联页面

- [[Modern Browser Architecture]]
- [[Browser Rendering Pipeline]]
- [[Browser Multi-Process Architecture]]
- [[Site Isolation]]
- [[Chromium]]
- [[Blink]]
- [[Gecko]]
- [[WebKit]]
