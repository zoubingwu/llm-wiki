---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - transformer
  - position
source_count: 1
---

# Positional Encoding

位置编码（Positional Encoding）是在 [[Transformer]] 输入嵌入（embedding）上叠加的位置信号，用来补足注意力机制本身“不感知顺序”的问题。

## 为什么需要

[[Self-Attention]] 只看词元之间的关系强度，不天然知道谁在前、谁在后。没有额外位置信息，模型无法区分“dog bites man”和“man bites dog”这种顺序不同但词集合相同的输入。

## 论文中的做法

[[Attention Is All You Need]] 使用固定的正弦 / 余弦位置编码（sinusoidal positional encoding）：

- 偶数维使用正弦函数
- 奇数维使用余弦函数
- 不同维度对应不同频率

论文也实验了可学习的位置嵌入（learned positional embeddings），结果与正弦方案接近，但最终选择正弦方案，因为作者认为它更有利于外推到更长序列。

## 与后续模型的关系

后续 LLM 并不都沿用这一具体方案。例如很多现代模型改用 RoPE（Rotary Position Embedding）。但“显式注入位置信息”这件事，是 Transformer 路线一直保留的核心设计。

## 参见

- [[Transformer]]
- [[Attention Mechanism]]
- [[Context Window]]
