---
type: concept
created: 2026-04-23
updated: 2026-04-23
tags:
  - frontend
  - web
  - keyboard
  - i18n
source_count: 2
---

# Keyboard Layout Mapping

键盘布局映射（keyboard layout mapping）是把浏览器拿到的物理键输入转换成用户意图中快捷键表示的过程。

## 为什么需要它

`code` 告诉系统按下了哪颗物理键，`key` 告诉系统当前布局下产出了什么字符。要把 `ctrl+shift+7` 识别成 `ctrl+/`，系统还需要知道当前布局里 `Digit7 + shift -> /`。

## 常见信息来源

- Native 或 Electron 环境可以直接调用 [[node-native-keymap]]
- Pure Web 环境可以使用预计算布局表加事件推断
- [[Keyboard Map API]] 可以补充当前布局下的 `code -> key` 映射

## 输出目标

布局映射层通常会输出一个 canonical shortcut string，再交给 [[Keybinding Service]] 做查找和冲突裁决。

## 实现边界

纯 Web 环境很难拿到 modifier-aware 的完整映射，因此国际化快捷键支持始终是一条比本地应用更难的实现路径。

## 关联页面

- [[Keyboard Shortcut Support in Web Apps]]
- [[Keyboard Event]]
- [[keyCode]]
- [[Keyboard Map API]]
- [[node-native-keymap]]
- [[Web 应用快捷键支持（一）：正确处理 Keyboard Event]]
- [[Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap]]
