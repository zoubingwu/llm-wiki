---
type: concept
created: 2026-04-23
updated: 2026-04-23
tags:
  - frontend
  - web
  - keyboard
  - expression
source_count: 1
---

# Context Key Expression

上下文键表达式（Context Key Expression）是附着在快捷键绑定上的 `when` 条件语句，用来描述一个快捷键在哪些 UI 状态下生效。

## 能表达什么

- 单个 boolean context key，例如 `editorTextFocus`
- string 或 number 比较，例如 `editorLangId == typescript`
- 逻辑组合 `&&` 和 `||`

## 在冲突裁决中的作用

表达式越具体，绑定的作用域越窄。比如 `terminalFocus && terminalFindWidgetFocus` 比单独的 `terminalFocus` 更具体，因此同样按 `enter` 时前者应先命中。

## 对系统设计的要求

应用需要定义一组可复用、足够通用的 context key，让不同模块共享一套状态语言。

## 关联页面

- [[Keybinding Service]]
- [[VS Code]]
- [[Keyboard Shortcut Support in Web Apps]]
- [[Web 应用快捷键支持（三）：VS Code 快捷键服务的实现]]
