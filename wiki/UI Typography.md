---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - design
  - ui
  - typography
source_count: 1
---

# UI Typography

界面排版（UI Typography）关注文字在界面中的可读性、层级、节奏和稳定性。它覆盖字体选择、字距、行距、字号体系、数字对齐、溢出处理和响应式文本。

## 核心维度

### 字符与行的空间

字偶距（Kerning）处理特定字符对之间的间距；字距（Tracking）把 letter-spacing 均匀施加到一组字符；行距（Leading）决定段落行与行之间的垂直节奏。标题、标签和正文分别需要不同的空间密度。

### 字体尺度与视觉大小

字体尺度（Type Scale）是一组可复用字号，用来维持层级一致性。x-height 和 cap height 会影响字体在同一字号下的视觉大小，因此 fallback font 需要匹配这些指标，降低字体加载后的布局移动。

### 数字与数据

等宽数字（Tabular Nums）让每个数字占用同样宽度，适合价格、统计值、倒计时和动态数据表格。数字频繁变化的界面需要优先考虑这个字体特性。

### 文本溢出

文本溢出（Text Overflow）需要明确截断策略。标题、标签和描述文本的截断位置不同；单字符省略号、词边界、行数限制和 hover/详情查看都属于设计决策。

### 响应式文本

`clamp()` 可以用最小值、首选值和最大值表达 fluid type。它适合需要随容器或视口变化的标题和展示文本，但正文仍然要控制行长（Line Length），常见舒适范围约 65 个字符。

## 相关术语

- Optical Kerning
- Font Smoothing
- Hyphenation
- Widow
- Orphan
- Font Stack
- Variable Font
- Superscript / Subscript

## 关联页面

- [[Interface Design Vocabulary]]
- [[Design Systems]]
- [[UI Components]]
- [[Say precisely what you mean.]]
