---
type: entity
created: 2026-05-20
updated: 2026-05-20
tags:
  - entity
  - desktop-app
  - runtime
source_count: 1
---

# Electron

Electron 是跨平台桌面应用运行时，把 Chromium、Node.js、窗口管理和跨平台应用基础设施打包到同一个发行模型里。它让团队可以用 Web 技术构建桌面应用，同时获得成熟的窗口、菜单、更新、进程和扩展生态。

## 在当前 wiki 里的相关性

[[A Technical Deep Dive Into the New Raycast]] 把 Electron 作为 [[Raycast]] 2.0 架构选型时比较过的路线。[[VS Code]] 则是当前 wiki 中 Electron 路线的主要案例：它用 Web 技术承载编辑器 UI，并通过 [[node-native-keymap]] 读取操作系统键盘布局，支撑 [[Keyboard Shortcut Support in Web Apps]] 的桌面级快捷键体验。

[[Hybrid Native WebView Architecture]] 与 Electron 的核心差异在运行时边界：Electron 提供完整集成运行时，hybrid native WebView 架构把 native shell、system WebView、Node backend、Rust core 和 [[Typed IPC for Multi-runtime Apps]] 拆开管理。

## 关联页面

- [[A Technical Deep Dive Into the New Raycast]]
- [[Hybrid Native WebView Architecture]]
- [[Native-feel WebView Desktop Apps]]
- [[VS Code]]
- [[Raycast]]
