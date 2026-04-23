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

# Web 应用快捷键支持（一）：正确处理 Keyboard Event

这篇文章定义了 Web 快捷键系统的第一层：如何读取和截断 [[Keyboard Event]]，以及为什么传统的 [[keyCode]] 做法在国际化键盘布局里会失真。

源文见：[Web 应用快捷键支持（一）：正确处理 Keyboard Event](<../articles/Web 应用快捷键支持（一）：正确处理 Keyboard Event.md>)。

## 核心贡献

- 说明 `keypress` 已经退出标准，快捷键系统应围绕 `keydown` 和 `keyup`
- 用德语键盘示例解释 `keyCode` 在跨平台、跨布局时的歧义
- 引出 `key` 与 `code` 两个更清晰的替代字段
- 给出 VS Code / Monaco 里 `Ctrl+/` 的具体案例

## 在当前 wiki 中的位置

这篇文章为 [[Keyboard Shortcut Support in Web Apps]] 提供了事件层和遗留属性问题的背景，对 [[Keyboard Event]]、[[keyCode]] 与 [[Keyboard Layout Mapping]] 三页提供了直接来源。

## 源文件校对说明

录入时修正了源文件里的少量明显笔误。

## 关联页面

- [[Keyboard Shortcut Support in Web Apps]]
- [[Keyboard Event]]
- [[keyCode]]
- [[Keyboard Layout Mapping]]
- [[VS Code]]
- [[Peng Lyu]]
