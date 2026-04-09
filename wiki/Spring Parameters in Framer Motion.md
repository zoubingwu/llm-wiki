---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 动画
  - 前端
  - 参数
source_count: 1
---

# Spring Parameters in Framer Motion

在 Framer Motion 中，弹簧动画通常由三个核心参数驱动：`mass`、`stiffness` 和 `damping`。

## mass（质量）

质量（mass）影响系统对外力变化的响应速度。质量越大，通常系统越“沉”，变化越慢。

## stiffness（刚度）

刚度（stiffness）决定弹簧的恢复力大小。刚度越大，元素越倾向于更快拉回目标位置。

## damping（阻尼）

阻尼（damping）决定振荡衰减的速度。阻尼越高，动画越快稳定下来。

## 默认值

根据原文引用的文档，Framer Motion 默认的弹簧参数是：

- `stiffness = 100`
- `damping = 10`
- `mass = 1`

## 相关概念

- [[Framer Motion]]
- [[Spring Animation]]
- [[Hooke's Law]]
- [[Damping in Spring Animation]]
