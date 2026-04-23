---
type: concept
created: 2026-04-23
updated: 2026-04-23
tags:
  - frontend
  - web
  - input
  - keyboard
source_count: 2
---

# Keyboard Event

键盘事件（Keyboard Event）是浏览器在用户按键时发出的输入事件对象，也是 Web 快捷键系统的起点。

## 快捷键实现里的关键选择

- `keydown` 适合作为主派发时机，因为命令可以在浏览器默认行为之前被截断
- `keyup` 更适合释放态或结束态逻辑
- `keypress` 只覆盖可生成字符的输入，而且已经退出标准

## 关键字段

- `key` 表示当前布局和 modifier 作用后的字符或命名键值
- `code` 表示物理键位置
- `ctrl`、`alt`、`shift`、`meta` 表示组合键状态
- [[keyCode]] 是旧实现里常见的遗留属性

## 事件对象还缺的那块信息

Keyboard Event 能告诉系统“按下了哪颗物理键”和“这次输入产出了什么字符”。快捷键国际化还需要知道 `code + modifier -> key` 的完整映射，因此实现层通常还要引入 [[Keyboard Layout Mapping]]。

## 关联页面

- [[Keyboard Shortcut Support in Web Apps]]
- [[keyCode]]
- [[Keyboard Layout Mapping]]
- [[Keybinding Service]]
- [[Web 应用快捷键支持（一）：正确处理 Keyboard Event]]
- [[Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap]]
