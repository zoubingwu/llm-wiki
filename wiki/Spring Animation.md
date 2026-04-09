---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 动画
  - 前端
  - 物理
source_count: 1
---

# Spring Animation

弹簧动画（Spring Animation）是一类用弹簧物理模型来驱动过渡过程的动画方式。它不直接指定持续时间和缓动曲线，而是通过物理参数让系统自然收敛到目标状态。

## 核心特征

- 动画会表现出“加速、回弹、震荡、收敛”的自然感
- 常见参数包括 [[Spring Parameters in Framer Motion|mass、stiffness、damping]]
- 最终效果由系统动力学决定，而不是单一的 easing 函数

## 物理基础

弹簧动画通常建立在 [[Hooke's Law]] 和 [[Harmonic Oscillator]] 的基础上，再加入 [[Damping in Spring Animation|阻尼]] 来让系统逐渐停下。

## 在前端中的应用

在前端动画库中，弹簧动画常用于：

- 按钮按压反馈
- 卡片和模态框的进入/退出
- 拖拽后的回弹
- 更具“手感”的 UI 过渡

## 相关概念

- [[Hooke's Law]]
- [[Harmonic Oscillator]]
- [[Damping in Spring Animation]]
- [[Framer Motion]]
