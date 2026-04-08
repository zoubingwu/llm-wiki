---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - agent
  - memory
  - file-system
source_count: 1
---

# File System as Context

将文件系统视为终极上下文的理念，将其用作无限、持久、可直接操作的外部内存。

## 背景

现代 LLM 虽有百万级 token 窗口，但在 agent 场景中仍不够：
- 观察结果可能巨大（网页、PDF）
- 性能超出一定长度会下降
- 长输入昂贵（即使有前缀缓存）

## 传统方案的问题

压缩/截断策略导致**不可逆的信息丢失**。Agent 必须基于所有先前状态预测下一步，无法预知哪条观察在十步后关键。

## 文件系统方案

- 将上下文**外部化**到文件系统
- Agent 按需读写文件
- 文件系统成为**结构化外部内存**
- 压缩可恢复（如保留 URL/路径，内容可重读）

## 可恢复压缩示例

- 网页内容可丢弃，只要保留 URL
- 文档内容可省略，只要路径仍在沙箱中

## 对未来模型的启发

如果 [[State Space Model (SSM)]] 能掌握基于文件的记忆，将长期状态外部化，可能解锁新一代 agent（类似 [[Neural Turing Machines]]）。

## 相关概念

- [[Agent Loop]]
- [[Recitation for Attention Manipulation]] — todo.md 就是文件系统作为上下文的一个应用
- [[Manus]]