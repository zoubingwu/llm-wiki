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

# State Space Model (SSM)

状态空间模型（State Space Model，SSM）是一类用于序列建模的模型架构，常被视为 Transformer 之外的另一条路线。

## 在当前 wiki 里的相关性

在 [[File System as Context]] 中，SSM 被提到是未来智能体系统的一种可能方向。核心设想是：

- SSM 本身在速度和效率上可能优于基于全注意力的架构
- 但它不擅长处理长距离的逆向依赖
- 如果能把长期状态外部化到文件系统，而不是强行保存在上下文里，SSM 也许能更适合智能体任务

## 对智能体的启发

如果 SSM 能与外部记忆机制结合，它可能支持一种更快、更轻量的智能体系统设计。

## 相关概念

- [[File System as Context]]
- [[Neural Turing Machines]]
- [[Context Engineering]]
