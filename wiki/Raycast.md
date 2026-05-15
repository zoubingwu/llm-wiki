---
type: entity
created: 2026-05-15
updated: 2026-05-15
tags:
  - entity
  - desktop-app
  - productivity
  - raycast
source_count: 1
---

# Raycast

Raycast 是一款面向 power users 的桌面生产力工具，最初是基于 Swift/AppKit 的 macOS launcher，后来扩展为包含 AI Chat、Notes、extensions、sync、file search 等功能的平台。

## 在当前 wiki 里的相关性

[[A Technical Deep Dive Into the New Raycast]] 把 Raycast 2.0 作为一个高要求桌面应用重写案例：它需要跨 macOS 和 Windows 共享产品开发速度，同时保持接近平台原生应用的窗口、快捷键、浮层、材质、文件搜索和性能体验。

Raycast 的新架构连接了几条现有主题：

- 和 [[Keyboard Shortcut Support in Web Apps]] 一样，它关心桌面级输入体验。
- 和 [[VS Code]] 一样，它使用 Web 技术承载大量 UI 和扩展生态。
- 和 [[Liquid Glass Effect]] 相关，它在 macOS Tahoe 中采用 Apple 的 Liquid Glass 材质，让窗口视觉语言贴近系统。

## 技术栈演进

Raycast v1 的核心是 Swift/AppKit 原生应用，extensions 使用 React、TypeScript 和 Node.js，由 native app 渲染声明式 UI。Notes 是 Raycast 早期把 React app 放进 native window WebView 的大功能实验。

Raycast 2.0 采用 [[Hybrid Native WebView Architecture]]：

- macOS host app：Swift + AppKit + WKWebView
- Windows host app：C# + .NET 8 + WPF + WebView2
- shared frontend：React + TypeScript
- shared backend：Node.js
- portable/performance core：Rust

## 关键工程判断

Raycast 选择自建 hybrid stack 的原因是它需要对 OS 集成保持细粒度控制：全局快捷键、剪贴板、accessibility APIs、窗口管理、无焦点浮层、原生 tooltip/action panel、WebKit/WebView2 初始化参数和渲染节流都属于产品体验的一部分。

这条路线把 Electron/Tauri 的通用 infra 成本转移回团队内部，换来平台能力、视觉细节和性能路径上的控制权。

## 相关页面

- [[A Technical Deep Dive Into the New Raycast]]
- [[Hybrid Native WebView Architecture]]
- [[Native-feel WebView Desktop Apps]]
- [[Typed IPC for Multi-runtime Apps]]
- [[Rust File Indexer]]
- [[VS Code]]

