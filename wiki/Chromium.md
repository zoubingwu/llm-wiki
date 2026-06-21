---
type: entity
created: 2026-06-21
updated: 2026-06-21
tags:
  - browser
  - open-source
  - runtime
source_count: 1
---

# Chromium

Chromium 是开源浏览器项目，也是 Chrome、Edge、Brave 等浏览器和 WebView2 等运行时的重要基础。[[How modern browsers work]] 以 Chromium 为主线解释现代浏览器内部机制。

## 架构角色

Chromium 将网页运行拆成多个子系统：

- [[Blink]] 负责 HTML、CSS、DOM、layout、paint 和 compositor 相关渲染工作。
- [[V8 JavaScript Engine]] 负责 JavaScript 和 WebAssembly 执行。
- Browser Process 负责 UI、导航、权限提示、进程管理和高层协调。
- Network Service 处理请求、缓存、DNS、协议和网络安全策略。
- GPU Process 负责图形 API 调用和合成输出。
- Mojo IPC 连接浏览器内部服务和进程边界。

## 在当前 wiki 中的位置

[[Electron]] 把 Chromium 与 Node.js 打包成跨平台桌面运行时。[[A Technical Deep Dive Into the New Raycast]] 对比了 Electron、WebView2 和系统 [[WebKit]] 的运行时取舍。[[Liquid Glass Effect]] 中的 SVG filter 作为 `backdrop-filter` 方案也主要落在 Chromium 生态里。

## 关联页面

- [[How modern browsers work]]
- [[Modern Browser Architecture]]
- [[Browser Multi-Process Architecture]]
- [[Site Isolation]]
- [[Blink]]
- [[V8 JavaScript Engine]]
- [[Electron]]
