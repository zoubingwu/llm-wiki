---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - model
  - memory
  - architecture
source_count: 1
---

# Neural Turing Machines

神经图灵机（Neural Turing Machines）是一类将神经网络与外部可读写记忆结合起来的模型设计。

## 核心思想

它试图让模型不仅依赖内部参数和短期上下文，还能通过显式的外部存储来读写长期状态。

## 在当前 wiki 里的相关性

在 [[File System as Context]] 中，神经图灵机被用来类比未来可能出现的“基于文件记忆的智能体模型”。

- 文件系统可被视为一种外部记忆
- 智能体按需读写文件，类似模型访问外部存储
- 因此，具备外部记忆能力的模型架构与智能体系统天然相关

## 相关概念

- [[File System as Context]]
- [[State Space Model (SSM)]]
