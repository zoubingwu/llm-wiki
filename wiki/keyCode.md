---
type: concept
created: 2026-04-23
updated: 2026-04-23
tags:
  - frontend
  - web
  - keyboard
  - compatibility
source_count: 2
---

# keyCode

`keyCode` 是 Keyboard Event 的遗留属性，用单个数值混合表达字符、浏览器规则和操作系统虚拟键码，因此在跨布局、跨平台场景里会产生歧义。

## 歧义从哪里来

- 数字和字母经常退回 ASCII 值
- 其他键值经常落到浏览器实现或操作系统虚拟键码
- 同一物理组合在不同键盘布局上可能得到不同结果

## 典型例子

在德语键盘上，用户为了触发 `ctrl+/` 会按 `ctrl+shift+7`。macOS 可能把这个组合上报为 `keyCode: 191` 且 `shift: true`，于是结果同时像 `ctrl+/` 和 `ctrl+shift+/`。

## 现代替代路径

现代实现把职责拆给 `key` 和 `code`，再通过 [[Keyboard Layout Mapping]] 做最终归一化。这样系统既能看到物理键，也能看到当前布局下的字符输出。

## 关联页面

- [[Keyboard Event]]
- [[Keyboard Layout Mapping]]
- [[Keyboard Shortcut Support in Web Apps]]
- [[Web 应用快捷键支持（一）：正确处理 Keyboard Event]]
- [[Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap]]
