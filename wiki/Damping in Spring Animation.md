---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 动画
  - 阻尼
  - 物理
source_count: 1
---

# Damping in Spring Animation

弹簧动画中的阻尼（Damping）是让振荡逐渐减弱并最终停止的机制。

## 基本作用

如果只考虑 [[Hooke's Law]]，系统会一直来回震荡，不会自然停下。加入阻尼后，系统的能量会逐步耗散，动画便会收敛到静止位置。

文章中给出的阻尼力公式是：

```text
Fd = -d * v
```

其中：

- `d` 是阻尼参数
- `v` 是速度

## 视觉效果

- 阻尼较低：回弹更明显，停下更慢
- 阻尼较高：震荡更少，更快收敛

## 在前端动画中的意义

阻尼决定了 [[Spring Animation]] 的“稳重感”和“拖拽感”，是影响手感最明显的参数之一。

## 相关概念

- [[Spring Animation]]
- [[Harmonic Oscillator]]
- [[Spring Parameters in Framer Motion]]
