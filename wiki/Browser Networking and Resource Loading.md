---
type: concept
created: 2026-06-21
updated: 2026-06-21
tags:
  - browser
  - networking
  - performance
source_count: 1
---

# Browser Networking and Resource Loading

浏览器网络与资源加载（Browser Networking and Resource Loading）是页面生命周期的起点：浏览器把 URL 或导航动作转成网络请求，获取 HTML 与子资源，并把可处理的字节流交给渲染进程。

## 加载链路

[[How modern browsers work]] 把一次导航拆成以下阶段：

- URL 解析与安全检查：确定 scheme、host、搜索意图、blocklist 和 Safe Browsing 等策略。
- DNS lookup：把域名解析成 IP，可能经过操作系统 DNS、浏览器缓存或 DNS over HTTPS。
- 建立连接：HTTP over TCP/TLS，或 HTTP/3 over QUIC/UDP。
- 发送 HTTP 请求：在 HTTP/2 或 HTTP/3 中用多路复用承载多个资源请求。
- 接收响应：处理 status、headers、body、MIME sniffing、CORB 等跨源读取保护。
- 重定向与提交导航：得到最终内容后，browser process 选择或准备 renderer process 继续解析。

## 资源优化

现代浏览器会在网络阶段主动降低关键路径延迟：

- 预加载扫描器（preload scanner）在主 HTML parser 被 CSS 或同步 JavaScript 阻塞时继续扫描原始 markup，提前发现图片、脚本和 stylesheet。
- Early Hints（HTTP 103）让服务端在生成主响应期间先发送 `preconnect` 和 `preload` 线索。
- Speculation Rules API 通过 JSON 规则描述可预取或预渲染的 URL，让高概率导航提前完成。
- HTTP cache、DNS prefetch、preconnect、Fetch Priority 和 `link rel=preload` 都会影响资源开始时间和优先级。

## Chromium 中的位置

在 [[Chromium]] 中，Network Service 通常作为独立服务或进程运行。Renderer process 通过 browser process 请求网络能力，这让网络访问集中经过浏览器的权限和安全策略。

## 关联页面

- [[Modern Browser Architecture]]
- [[Browser Rendering Pipeline]]
- [[Browser Multi-Process Architecture]]
- [[Site Isolation]]
- [[Chromium]]
