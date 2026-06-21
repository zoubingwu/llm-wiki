---
type: concept
created: 2026-06-21
updated: 2026-06-21
tags:
  - browser
  - security
  - sandbox
source_count: 1
---

# Site Isolation

站点隔离（Site Isolation）是现代浏览器用进程边界隔离不同站点内容的安全机制。它在 [[Browser Multi-Process Architecture]] 基础上，把跨站页面、iframe 和敏感数据放入不同 renderer process，降低 Spectre 这类侧信道攻击的影响面。

## 核心机制

[[How modern browsers work]] 以 Chromium 为例说明：Chrome 在 Spectre 之后强化站点隔离，让跨源 iframe 进入独立 renderer process。Chrome 将这种跨进程 iframe 称为 OOPIF（Out-of-Process iframe）。

页面仍然表现为一个完整 tab，内部 frame tree 可以跨越多个进程。browser process 负责协调这些进程的渲染、输入事件和 IPC。

## 沙盒边界

Renderer process 和辅助进程运行在 sandbox 内。渲染器负责计算和渲染页面内容，文件系统、设备、剪贴板、麦克风、摄像头等能力通过 browser process 和权限提示中介。

这形成了两层防护：site isolation 降低跨站数据共处同一地址空间的机会，sandbox 降低 renderer 漏洞直接触达系统资源的能力。

## 代价

站点隔离会增加进程数量、内存占用和跨进程通信。浏览器通过同站进程复用、进程上限、按需创建和 IPC 优化平衡安全与资源成本。

## 关联页面

- [[Browser Multi-Process Architecture]]
- [[Modern Browser Architecture]]
- [[Chromium]]
- [[Gecko]]
- [[WebKit]]
