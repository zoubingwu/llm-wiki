---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - design
  - ui
  - layout
source_count: 1
---

# UI Layout

界面布局（UI Layout）负责用空间和结构组织内容。它决定元素之间的关系、屏幕尺寸变化时的适配方式，以及内容加载过程中的稳定性。

## 空间关系

间距（Gap）设置在 flex 或 grid 父级上，适合表达子项之间的固定关系。负空间（Negative Space）通过留白塑造层级和阅读路径。圆角（Border Radius）在嵌套元素中需要按外层半径减 padding 计算内层半径。

## 响应式结构

响应式设计（Responsive Design）依赖 fluid layout、flexible images 和 breakpoints。断点（Breakpoint）应由内容实际破裂的位置决定。最大宽度（Max-width）限制容器在宽屏上的行长和扫描距离。

## 视口与设备边界

视口单位（Viewport Units）中的 `dvh` 能处理移动浏览器地址栏显示和隐藏造成的高度变化。安全区（Safe Area）用于避开刘海、圆角和 home indicator，常见于固定底部控件。

## 稳定性

宽高比（Aspect Ratio）让图片和嵌入内容在加载前保留空间，降低布局移动（Layout Shift）。`z-index` 管理同一平面上的层叠顺序，modal、tooltip、dropdown 需要明确层级。

## 典型陷阱

`overflow: hidden` 会裁剪内容，也会影响 sticky positioning。粘性定位（Sticky Positioning）要求祖先容器允许它在滚动中达到阈值。

## 关联页面

- [[Interface Design Vocabulary]]
- [[UI Components]]
- [[Native-feel WebView Desktop Apps]]
- [[Say precisely what you mean.]]
