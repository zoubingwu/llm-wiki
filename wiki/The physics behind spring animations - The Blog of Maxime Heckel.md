---
type: source
created: 2026-04-22
updated: 2026-04-22
tags:
  - source
  - frontend
  - animation
  - physics
source_count: 1
---

# The physics behind spring animations - The Blog of Maxime Heckel

这篇文章用前端开发者容易接近的方式，把 [[Spring Animation|弹簧动画]] 背后的物理模型拆解成可计算的参数和公式，并用 Framer Motion 作为实际对应物。

源文见：[The physics behind spring animations - The Blog of Maxime Heckel](../articles/The%20physics%20behind%20spring%20animations%20-%20The%20Blog%20of%20Maxime%20Heckel.md)。

## 核心贡献

- 用 [[Hooke's Law]] 解释恢复力与位移的关系
- 将弹簧系统对应到 [[Harmonic Oscillator]]
- 把 `mass`、`stiffness`、`damping` 三个参数和前端动画手感连接起来
- 演示如何从加速度、速度、位置的离散更新公式推导动画轨迹
- 说明弹簧动画的物理直觉为何比固定 easing 更适合某些交互场景

## 在当前 wiki 中的位置

这篇文章是“前端动画中的物理模型”这条主题线的起点来源，对 [[Spring Animation]]、[[Damping in Spring Animation]] 与 [[Spring Parameters in Framer Motion]] 三页提供了基础解释。

## 中文校对说明

源文附带的中文对照存在明显机器翻译问题，录入时已经按英文原文修正，尤其集中在物理术语和参数说明上。

## 关联页面

- [[Maxime Heckel]]
- [[Spring Animation]]
- [[Hooke's Law]]
- [[Harmonic Oscillator]]
- [[Damping in Spring Animation]]
- [[Spring Parameters in Framer Motion]]
- [[Framer Motion]]
