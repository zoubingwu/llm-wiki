---
type: concept
created: 2026-04-11
updated: 2026-04-11
tags:
  - optics
  - graphics
  - frontend
source_count: 1
---

# Refraction

折射（Refraction）是光线从一种介质进入另一种介质时发生传播方向改变的现象。本质原因是光在不同介质中的传播速度不同。

## 基本关系

文章使用斯涅尔-笛卡尔定律（Snell-Descartes Law）描述入射角和折射角的关系：

`n1 * sin(theta1) = n2 * sin(theta2)`

其中：

- `n1` / `n2` 是两侧介质的折射率
- `theta1` 是入射角
- `theta2` 是折射角

## 在浏览器 Liquid Glass 实现中的作用

这篇文章并不直接做完整光线追踪，而是把折射问题压缩成一个适合 UI 的简化模型：

- 空气折射率固定为 1
- 玻璃材料折射率取大于 1 的值，常用 1.5
- 只考虑光线进入玻璃时的一次折射
- 入射方向始终与背景平面正交
- 物体视作与背景平行的二维形状

在这些条件下，只要知道局部表面法线，就能算出每个位置的位移方向和位移幅度。

## 设计上的直接影响

- 凸面会让折射位移更容易保持在物体内部
- 凹面会让光线向外发散，导致采样位置落到物体外
- 边缘曲率越突兀，折射梯度越硬，视觉上越容易出现“边缘感”

因此，[[Liquid Glass Effect]] 更偏好平滑的凸面边缘，而不是简单把模糊加到圆角矩形上。

## 相关概念

- [[Liquid Glass Effect]]
- [[SVG Displacement Map]]
- [[Specular Highlight]]
