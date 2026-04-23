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

# Web 应用快捷键支持（三）：VS Code 快捷键服务的实现

这篇文章把已经规范化的快捷键输入继续往下推进到命令查找、上下文判断和冲突裁决，补齐了 Web 快捷键系统的执行层。

源文见：[Web 应用快捷键支持（三）：VS Code 快捷键服务的实现](<../articles/Web 应用快捷键支持（三）：VS Code 快捷键服务的实现.md>)。

## 核心贡献

- 给出 `key -> keybindings[]` 和 `command -> keybindings[]` 两类索引
- 解释快捷键冲突里注册顺序的作用
- 解释 `when` 表达式如何通过 context key 描述绑定生效条件
- 说明更具体的 `when` 表达式应该优先于更宽的表达式

## 在当前 wiki 中的位置

这篇文章为 [[Keybinding Service]] 和 [[Context Key Expression]] 提供了直接来源，也让 [[Keyboard Shortcut Support in Web Apps]] 形成了完整的三层闭环。

## 源文件校对说明

录入时修正了代码示例排版和少量错字。

## 关联页面

- [[Keyboard Shortcut Support in Web Apps]]
- [[Keybinding Service]]
- [[Context Key Expression]]
- [[VS Code]]
- [[Peng Lyu]]
