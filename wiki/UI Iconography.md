---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - design
  - ui
  - iconography
source_count: 1
---

# UI Iconography

界面图标学（UI Iconography）关注图标如何被绘制、配重、缩放和学习。好的图标系统需要在尺寸、笔画、状态和隐喻上保持一致。

## 绘制质量

笔画粗细（Stroke Weight）需要随图标尺寸调整；小尺寸图标需要像素提示（Pixel Hinting），让路径清晰落在像素网格上。光学中心（Optical Centre）处理视觉居中与几何居中的偏差，例如播放按钮经常需要略微右移。

## 系统一致性

图标库（Icon Library）应共享尺寸、笔画、圆角和视觉风格。混用多个库会在按钮、列表和导航里积累细微不一致。统一权重（Unified Weight）要求图标和相邻文本在视觉重量上相配。

## 状态表达

填充图标与线性图标（Filled vs Outlined）常用于区分 active、selected 和 default 状态。上下文切换（Contextual Swap）需要形成稳定规则，让用户能学习同一状态变化模式。

## 语义风险

意义碰撞（Meaning Collision）指同一图标在同一产品里承担多个动作，例如 star 同时表示收藏和评分。隐喻准确性（Metaphor Accuracy）要求图标与目标动作保持可识别关系，并随用户群体变化定期审视。

## 关联页面

- [[Interface Design Vocabulary]]
- [[UI Components]]
- [[Design Systems]]
- [[Say precisely what you mean.]]
