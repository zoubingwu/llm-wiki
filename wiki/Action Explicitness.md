---
type: concept
created: 2026-06-26
updated: 2026-06-26
tags:
  - agent
  - AX
  - design-principle
source_count: 1
---

# Action Explicitness

动作明确性（Action Explicitness）是 [[Agent Experience Design (AX)|AX]] 的核心设计原则之一：将智能体内部的决策选项**显式外化**为可选的路径，而非假设智能体会自行推导。

## 为什么需要

人类撰写回复时，不需要 UI 上标注「决定是否发送」或「放弃此草稿重新开始」——这些决策在内部流畅地发生，软件只需要支持人类外化的动作。

**智能体需要将这些内部选项外化。** 否则智能体面临的是一个只接受最终输出的界面，中间的所有判断——发还是不发、沉默还是覆盖、修改还是原样——都被隐藏了。

## 在 Raft 中的应用

[[Held Draft]] 的四条处置路径（修改、原样发送、保持沉默、强制发送）不是智能体凭空生成的选项——它们是 AX **显式**呈现给智能体的选项空间。

## AX 与 UX 在此处的分歧

这是 AX 与 UX 最显著的区别点。UX 假设决策在用户内部完成，只暴露最终动作入口。AX 必须把决策分支本身作为界面的一部分呈现出来。

## 参见

- [[Perception Empathy]]
- [[Agent Experience Design (AX)]]
- [[Held Draft]]
- [[Raft (formerly Slock)]]
- [[Is Having Agents in the Room Meant to Be Chaotic]]
