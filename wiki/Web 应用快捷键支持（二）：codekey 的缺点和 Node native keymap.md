---
type: source
created: 2026-04-23
updated: 2026-04-23
tags:
  - source
  - frontend
  - keyboard
  - web
source_count: 1
---

# Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap

这篇文章讨论 `key` 和 `code` 各自解决了什么、仍然缺什么，并把焦点转向键盘布局映射（keyboard layout mapping）。

源文见：[Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap](<../articles/Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap.md>)。

## 核心贡献

- 解释 `key` 关注字符输出，`code` 关注物理按键
- 说明 `key` 和 `code` 仍然无法单独推断 `shift+7 -> /` 这类布局知识
- 介绍 [[node-native-keymap]] 如何为 Electron 应用补上操作系统层的键盘布局信息
- 比较纯 Web 环境里的预计算布局表方案和 [[Keyboard Map API]]

## 在当前 wiki 中的位置

这篇文章是 [[Keyboard Layout Mapping]]、[[node-native-keymap]] 和 [[Keyboard Map API]] 三页的直接来源，也把主题线从事件层推进到了布局层。

## 源文件校对说明

录入时修正了示例代码排版和少量错字。

## 关联页面

- [[Keyboard Shortcut Support in Web Apps]]
- [[Keyboard Layout Mapping]]
- [[Keyboard Map API]]
- [[node-native-keymap]]
- [[Keyboard Event]]
- [[VS Code]]
- [[Peng Lyu]]
