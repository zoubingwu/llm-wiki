---
type: source
created: 2026-06-21
updated: 2026-06-21
tags:
  - source
  - browser
  - web-platform
  - rendering
source_count: 1
---

# How modern browsers work

这篇文章是 [[Addy Osmani]] 对现代浏览器内部机制的系统导览，重点以 [[Chromium]] 为主线，同时比较 [[Gecko]] 和 [[WebKit]] 的实现差异。文章把一次页面加载拆成网络请求、HTML/CSS/JavaScript 解析、样式计算、布局、绘制、光栅化、合成、JavaScript 执行、模块加载、多进程隔离和安全沙盒。

源文见：[How modern browsers work](../articles/How%20modern%20browsers%20work.md)。

## 核心贡献

- 把现代浏览器描述为由网络栈、渲染引擎、JavaScript 引擎、GPU 合成、进程模型和安全边界组成的运行时系统。
- 解释 [[Browser Networking and Resource Loading]] 中的 URL 解析、DNS、TCP/TLS、HTTP/2、HTTP/3、preload scanner、Early Hints、Speculation Rules API 和资源优先级。
- 串联 [[Browser Rendering Pipeline]]：DOM、CSSOM、computed style、layout tree、paint records、layers、raster tiles、compositor frames 和 GPU process。
- 说明 [[V8 JavaScript Engine]] 的后台编译、Ignition、Sparkplug、Maglev、TurboFan/Turboshaft、去优化和 Orinoco GC。
- 将 [[Browser Multi-Process Architecture]]、[[Site Isolation]]、OOPIF 和 sandbox 放进同一个安全模型里理解。
- 通过 [[Browser Engine Comparison]] 对比 [[Blink]]、[[Gecko]]、[[WebKit]] 在样式计算、图形管线、JavaScript 引擎和进程模型上的取舍。

## 在当前 wiki 中的位置

这篇文章补齐了 Web 平台的底层运行时主题。它和 [[Liquid Glass Effect]]、[[Keyboard Shortcut Support in Web Apps]]、[[Native-feel WebView Desktop Apps]]、[[Electron]] 共同构成浏览器与 WebView 技术谱系：视觉与交互页面关注表现层，本文关注浏览器内部如何把 HTML、CSS、JS 和安全边界组织成可运行系统。

## 关联页面

- [[Modern Browser Architecture]]
- [[Browser Networking and Resource Loading]]
- [[Browser Rendering Pipeline]]
- [[Browser Multi-Process Architecture]]
- [[Site Isolation]]
- [[V8 JavaScript Engine]]
- [[JavaScript Module Loading]]
- [[Browser Engine Comparison]]
- [[Chromium]]
- [[Blink]]
- [[Gecko]]
- [[WebKit]]
