---
type: concept
created: 2026-06-21
updated: 2026-06-21
tags:
  - browser
  - architecture
  - security
source_count: 1
---

# Browser Multi-Process Architecture

浏览器多进程架构（Browser Multi-Process Architecture）用操作系统进程拆分浏览器职责，让浏览器 UI、网页内容、网络、GPU、扩展和工具服务分别运行在不同边界内。

## 主要进程

[[How modern browsers work]] 以 [[Chromium]] 为例列出几个核心进程：

- Browser Process：控制浏览器 UI、导航、权限提示、进程调度和高层协调。
- Renderer Process：运行 [[Blink]] 和 [[V8 JavaScript Engine]]，负责页面 DOM、style、layout、paint 和脚本执行。
- GPU Process：接收 compositor frame，调用 OpenGL、DirectX、Metal 等图形 API 完成合成。
- Network Process / Network Service：处理 DNS、socket、HTTP、cache 和网络安全策略。
- Utility / Extension Processes：承载音频、图像解码、扩展脚本等可拆分服务。

## IPC 与职责边界

进程之间通过 IPC 通信。Chromium 使用 Mojo 组织内部服务通信，大数据传输会结合 shared memory 等方式降低复制成本。

这个模型让 renderer 把网络、文件、设备、权限等能力交给 browser process 协调。页面脚本主要在 renderer 中运行，特权操作通过浏览器 UI 和服务进程中介。

## 成本与收益

多进程模型提升稳定性、安全隔离和多核并行能力，同时带来更多进程、更多内存占用和 IPC 协调成本。[[Site Isolation]] 在这套模型上进一步把不同站点拆到不同 renderer process。

## 关联页面

- [[Modern Browser Architecture]]
- [[Site Isolation]]
- [[Chromium]]
- [[Gecko]]
- [[WebKit]]
- [[Electron]]
