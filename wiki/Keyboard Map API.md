---
type: concept
created: 2026-04-23
updated: 2026-04-23
tags:
  - frontend
  - web
  - keyboard
  - standards
source_count: 1
---

# Keyboard Map API

Keyboard Map API 是浏览器侧获取当前键盘布局映射的接口提案，核心入口是 `navigator.keyboard.getLayoutMap()`。

## 提供的信息

这个 API 返回 `KeyboardEvent.code` 到可显示字符的映射，适合判断当前布局，以及向用户展示更接近实际键帽的快捷键提示。

## 对快捷键系统的价值

- 帮助 Web 应用更准确地识别当前键盘布局
- 改善不同布局上的按键展示文本
- 为 [[Keyboard Layout Mapping]] 提供额外信号

## 局限

- 文章讨论时它仍处于提案阶段
- 映射只覆盖 `code -> key`，不包含 modifier 组合
- 布局变化监听和实现兼容性还在演进

## 关联页面

- [[Keyboard Layout Mapping]]
- [[Keyboard Event]]
- [[node-native-keymap]]
- [[Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap]]
