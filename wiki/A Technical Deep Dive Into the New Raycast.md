---
type: source
created: 2026-05-15
updated: 2026-05-15
tags:
  - source
  - desktop-app
  - architecture
  - raycast
source_count: 1
---

# A Technical Deep Dive Into the New Raycast

这篇文章记录 [[Raycast]] 2.0 的跨平台重写：从 macOS-only 的 Swift/AppKit 原生应用，转成同时支持 macOS 和 Windows 的 [[Hybrid Native WebView Architecture|混合原生 WebView 架构]]。核心目标是让团队共享 React、TypeScript、Node 和 Rust 层，同时保留平台原生窗口、全局快捷键、剪贴板、无焦点浮层、可访问性和系统视觉材质等能力。

源文见：[A Technical Deep Dive Into the New Raycast](../articles/A%20Technical%20Deep%20Dive%20Into%20the%20New%20Raycast.md)。

![[raycast-2-tech-stack-mobile.png|Raycast 2.0 技术栈]]

## 核心贡献

- 解释 Raycast 从单平台原生 AppKit 应用转向跨平台架构的动因：Windows 支持、产品范围扩大、AppKit 约束、编译速度和招聘难度。
- 比较 Electron、Tauri、Flutter、Qt、React Native for Desktop、跨平台 Swift 等路线，最后选择自建原生 shell + 系统 WebView 的混合方案。
- 把 Raycast 2.0 拆成四层：Swift/C# host app、React + TypeScript web frontend、Node backend、Rust core。
- 说明 [[Typed IPC for Multi-runtime Apps|多运行时类型化 IPC]] 如何让 Swift/C#、WebView、Node 和 Rust 之间的接口保持一致。
- 展示 [[Native-feel WebView Desktop Apps|WebView 桌面应用的原生手感]] 需要处理的平台惯例、原生浮层、WebKit/WebView2 节流、窗口 resize、首帧闪烁和 emoji 字体预热。
- 用 [[Rust File Indexer|Rust 文件索引器]] 说明性能关键路径如何从系统 Spotlight 依赖转成跨平台自有索引。

## 架构拆分

Raycast 2.0 的四层分工很清晰：

- Host app：macOS 使用 Swift + AppKit，Windows 使用 C# + .NET 8 + WPF，负责窗口、菜单栏或托盘、全局快捷键、平台 API 和 WebView 装载。
- Web frontend：一个 React + TypeScript 项目服务两个平台，按 Launcher、AI Chat、Notes、Settings 等窗口拆入口。
- Node backend：一个长期运行的 Node 进程承载数据库访问、扩展运行时、长生命周期服务和业务逻辑。
- Rust core：承载数据层、同步 schema 和文件索引器等对性能、内存稳定性或跨平台复用要求更高的模块。

这个拆分让多数产品工作落在共享 Web frontend 与 Node backend 上，平台 shell 集中处理 OS 能力暴露和原生体验优化。

## 性能与内存取舍

文章直接给出 Raycast v1 与 v2 的内存对比：v1 常见使用后约 200-300 MB，v2 类似场景约 350-450 MB。主要新增成本来自 WebView 和 Node backend，native shell 本身约 40 MB。

Raycast 对这个取舍的解释是：跨平台共享 UI、热更新开发体验、丰富文本渲染、扩展平台一致性和招聘面扩大会换来更高的运行时基线。后续优化重点包括延迟加载 frontend/backend、图标和图片处理、V8 heap 收紧、低内存设备测试。

## 与现有主题的连接

这篇文章补充了现有 wiki 中 [[Keyboard Shortcut Support in Web Apps]] 与 [[VS Code]] 之外的另一个桌面 Web 技术案例。VS Code 代表 Electron 路线，Raycast 代表自建 native shell + system WebView 路线；两者共同说明“Web 技术做桌面应用”的关键挑战已经从能否渲染 UI，推进到键盘、窗口、IPC、内存、可访问性和系统视觉一致性。

## 关联页面

- [[Raycast]]
- [[Hybrid Native WebView Architecture]]
- [[Native-feel WebView Desktop Apps]]
- [[Typed IPC for Multi-runtime Apps]]
- [[Rust File Indexer]]
- [[Keyboard Shortcut Support in Web Apps]]
- [[VS Code]]

