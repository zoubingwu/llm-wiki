---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - design
  - ui
  - accessibility
source_count: 1
---

# Accessibility in UI Design

界面可访问性（Accessibility in UI Design）关注不同能力、设备和输入方式的用户能否完成同样任务。它同时涉及颜色、DOM、键盘、语义、焦点和状态表达。

## 对比模型

WCAG（Web Content Accessibility Guidelines）是常见的 Web 可访问性标准，AA 阈值通常要求正文 4.5:1、大字和 UI 组件 3:1。APCA（Advanced Perceptual Contrast Algorithm）进一步考虑字号和字重，更接近真实阅读条件。

## 屏幕阅读器

屏幕阅读器（Screen Reader）按 DOM order、标题结构和 ARIA roles 读取界面。视觉顺序和 DOM 顺序需要保持一致，否则看到的路径和听到的路径会分裂。

## 键盘与焦点

Tab order 应按逻辑阅读顺序移动。modal 或 dialog 打开时需要 focus trap，让键盘焦点保持在当前上下文内。无可见文本的图标按钮需要 aria-label 提供可访问名称。

## 语义 HTML

语义 HTML（Semantic HTML）让浏览器原生提供键盘事件、焦点和 role。例如 button 元素天然承载按钮行为。输入控件需要 label association，通过 `for` 和 `id` 连接标签与控件。

## 状态表达

颜色状态需要与图标或文本一起使用。错误、成功、禁用、选中等状态都应在色彩之外提供额外信号，覆盖色盲用户、低对比环境和辅助技术。

## 关联页面

- [[UI Color Systems]]
- [[UI Motion]]
- [[UI Components]]
- [[Interface Design Vocabulary]]
- [[Say precisely what you mean.]]
