---
type: overview
created: 2026-06-21
updated: 2026-06-21
tags:
  - browser
  - web-platform
  - architecture
source_count: 1
---

# Modern Browser Architecture

现代浏览器架构（Modern Browser Architecture）把浏览器视为一个 Web 应用运行时：它负责获取资源、解析 HTML/CSS/JavaScript、执行脚本、计算布局、绘制图形、提交 GPU 合成帧，并用进程边界和沙盒隔离不同站点。

[[How modern browsers work]] 以 [[Chromium]] 为主线说明这套架构，同时对比 [[Gecko]] 和 [[WebKit]] 的实现。

## 核心子系统

- [[Browser Networking and Resource Loading]]：由浏览器进程和 Network Service 处理 URL、DNS、连接、HTTP 请求、缓存、重定向、安全检查和资源优先级。
- [[Browser Rendering Pipeline]]：由渲染进程把 DOM、CSSOM 和 JavaScript 变化转成 layout、paint、raster 和 composite。
- [[V8 JavaScript Engine]]：在 Chromium 中执行 JavaScript 和 WebAssembly，并通过 bindings 调用 DOM、fetch 等浏览器 API。
- [[JavaScript Module Loading]]：用模块图、module map、import maps 和 dynamic import 组织现代 JavaScript 依赖。
- [[Browser Multi-Process Architecture]]：用 Browser、Renderer、GPU、Network、Utility、Extension 等进程拆分职责。
- [[Site Isolation]]：用站点级 renderer 进程、OOPIF 和 sandbox 降低跨站数据泄露和系统逃逸风险。

## 开发者意义

这套架构解释了许多前端性能建议的底层原因：CSS 会影响首次渲染，普通脚本会阻塞 HTML parser，DOM 读写交错会触发布局抖动，`transform` 和 `opacity` 动画更容易交给 compositor，跨源 iframe 会带来进程和 IPC 成本。

## 关联页面

- [[How modern browsers work]]
- [[Browser Engine Comparison]]
- [[Liquid Glass Effect]]
- [[Keyboard Shortcut Support in Web Apps]]
- [[Native-feel WebView Desktop Apps]]
- [[Electron]]
