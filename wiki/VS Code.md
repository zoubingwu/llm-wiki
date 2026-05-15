---
type: entity
created: 2026-04-23
updated: 2026-05-15
tags:
  - entity
  - editor
  - frontend
source_count: 4
---

# VS Code

VS Code 是这组三篇文章的核心案例应用，用来展示 Web 技术栈里如何实现接近桌面应用体验的快捷键系统。

## 在当前 wiki 里的相关性

它把 [[Keyboard Event]]、[[Keyboard Layout Mapping]]、[[Keybinding Service]] 和 [[Context Key Expression]] 连接成了一条完整链路；在 Electron 环境里还借助 [[node-native-keymap]] 获取操作系统层的键盘布局信息。

[[A Technical Deep Dive Into the New Raycast]] 把 VS Code 作为 Electron 案例提到，用来说明 Electron 已经能支撑高质量桌面产品。它和 [[Raycast]] 形成两种桌面 Web 技术路线：VS Code 代表成熟 Electron runtime，Raycast 代表自建 [[Hybrid Native WebView Architecture|native shell + system WebView]]。

## 关键点

- 以 `keydown` 作为快捷键主入口
- 支持默认、插件、用户三层绑定
- 使用 `when` 表达式描述绑定生效条件
- 在快捷键冲突时同时考虑作用域具体性和注册顺序

## 相关页面

- [[Keyboard Shortcut Support in Web Apps]]
- [[Keybinding Service]]
- [[Context Key Expression]]
- [[node-native-keymap]]
- [[Peng Lyu]]
- [[Raycast]]
