---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - transformer
  - attention
source_count: 1
---

# Multi-Head Attention

多头注意力（Multi-Head Attention）是把查询（Query）、键（Key）和值（Value）投影到多个不同子空间后，并行执行多次 [[Scaled Dot-Product Attention]]，最后再拼接起来的机制。

## 为什么需要多个头

单个注意力头容易把不同关系平均到一起。多头注意力的目的，是让模型在不同表示子空间里分别关注不同模式，例如：

- 局部语法关系
- 长距离依赖
- 对齐关系
- 不同语义角色

这也是 [[Transformer]] 能在不使用 RNN 的前提下保持表达能力的重要原因。

## 在论文中的配置

论文基础模型使用：

- $h=8$ 个头
- $d_{model}=512$
- 每个头的 $d_k=d_v=64$

由于每个头的维度更小，总计算成本与单头全维度注意力接近，但表达能力更强。

## 在 Transformer 中的三种用法

- 编码器中的自注意力
- 解码器中的带掩码自注意力
- 解码器对编码器输出的交叉注意力

## 参见

- [[Scaled Dot-Product Attention]]
- [[Self-Attention]]
- [[Transformer]]
