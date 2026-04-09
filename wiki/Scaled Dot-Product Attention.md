---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - transformer
  - attention
source_count: 1
---

# Scaled Dot-Product Attention

缩放点积注意力（Scaled Dot-Product Attention）是 [[Attention Is All You Need]] 中定义的标准注意力计算形式，也是 [[Transformer]] 的基础操作。

## 定义

它接收查询（Query）、键（Key）和值（Value）三组向量，先计算查询与所有键的点积相似度，再除以 $\sqrt{d_k}$ 做缩放，最后经过 softmax 得到权重，对值做加权求和。

公式为：

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}(\frac{QK^T}{\sqrt{d_k}})V
$$

## 为什么要缩放

如果不除以 $\sqrt{d_k}$，当向量维度较大时，点积值会过大，softmax 容易进入梯度很小的区域，训练会变差。缩放的作用就是让数值范围更稳定。

## 与其他注意力形式的关系

论文将它与加性注意力（additive attention）对比，结论是：

- 理论复杂度相近
- 点积注意力更适合矩阵乘法实现
- 实际速度更快、空间效率更高

## 参见

- [[Self-Attention]]
- [[Multi-Head Attention]]
- [[Attention Mechanism]]
