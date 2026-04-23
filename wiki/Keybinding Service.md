---
type: concept
created: 2026-04-23
updated: 2026-04-23
tags:
  - frontend
  - web
  - keyboard
  - architecture
source_count: 1
---

# Keybinding Service

快捷键服务（Keybinding Service）负责把规范化后的快捷键字符串映射到命令，并在当前上下文里选出应该执行的那一条绑定。

## 核心数据结构

常见实现会同时维护两类索引：

- `key -> Keybinding[]`
- `command -> Keybinding[]`

这样系统既能按快捷键查命令，也能按命令查绑定。

## 冲突裁决

- 先看 [[Context Key Expression]] 是否成立
- 多条绑定同时成立时，优先选择作用域更具体的 `when`
- 仍然并列时，再按注册顺序或内部 order 决定优先级

## 运行流程

监听 [[Keyboard Event]]，经过 [[Keyboard Layout Mapping]] 归一化，再查找绑定、执行命令，并在命中时调用 `preventDefault()`。

## 代表实现

[[VS Code]] 会依次加载默认绑定、插件绑定和用户绑定，再以更晚注册的绑定覆盖更早注册的绑定。

## 关联页面

- [[Keyboard Shortcut Support in Web Apps]]
- [[Keyboard Event]]
- [[Keyboard Layout Mapping]]
- [[Context Key Expression]]
- [[VS Code]]
- [[Web 应用快捷键支持（三）：VS Code 快捷键服务的实现]]
