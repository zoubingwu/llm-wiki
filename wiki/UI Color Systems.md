---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - design
  - ui
  - color
source_count: 1
---

# UI Color Systems

界面色彩系统（UI Color Systems）把颜色从单个视觉选择组织成可维护的变量、语义、对比度和主题规则。它既包含色彩空间，也包含设计 token、可访问性和暗色模式策略。

## 色彩空间

sRGB 是传统 Web 色彩空间，十六进制颜色默认属于这里。P3 提供更宽的显示范围，能表达更鲜艳的绿色和红色。OKLCH 按人眼感知建模亮度，适合生成视觉亮度更一致的调色板和渐变。

## 语义 token

语义 token（Semantic Token）按用途命名颜色，例如 `--color-border-subtle`。这种命名方式把“边界用途”与具体色值拆开，使主题、暗色模式和品牌刷新可以通过替换值完成。

## 对比与可访问性

对比度（Contrast Ratio）描述前景与背景的亮度差。WCAG 常用阈值包括正文 4.5:1、大字和 UI 组件 3:1。真实界面还要结合字号、字重、背景复杂度和状态变化检查。

## 感知色彩

饱和度（Saturation）和 OKLCH 中的 chroma 都描述颜色鲜艳程度，后者更接近人眼感知。浅色 tint 中降低 chroma 可以保留颜色生命力；只降低透明度通常会把颜色推向灰。

## 暗色模式

暗色模式（Dark Mode）需要重新审视每个颜色决策。表面层级、边框、文本、品牌色和状态色在暗背景中的亮度关系会改变，直接复用浅色模式 token 容易形成层级失衡。

## 关联页面

- [[Interface Design Vocabulary]]
- [[Accessibility in UI Design]]
- [[Design Systems]]
- [[Liquid Glass Effect]]
- [[Say precisely what you mean.]]
