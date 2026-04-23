---
type: entity
created: 2026-04-23
updated: 2026-04-23
tags:
  - entity
  - module
  - keyboard
source_count: 1
---

# node-native-keymap

`node-native-keymap` 是一个 Node 原生模块，用于把当前操作系统的键盘布局信息暴露给 JavaScript。

## 提供能力

- 检测当前键盘布局类型
- 监听布局变化
- 查询不同物理键和 modifier 组合生成的字符

## 在当前 wiki 里的相关性

它让 [[VS Code]] 这类 Electron 应用能够把 `ctrl+shift+7` 这类布局相关输入归一化成真正的意图快捷键，因此是 [[Keyboard Layout Mapping]] 的关键基础设施。

## 相关页面

- [[Keyboard Layout Mapping]]
- [[Keyboard Map API]]
- [[VS Code]]
- [[Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap]]
