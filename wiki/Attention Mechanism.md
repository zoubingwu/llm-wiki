---
type: concept
created: 2026-04-08
updated: 2026-04-09
tags:
  - LLM
  - context
  - transformer
source_count: 2
---

# Attention Mechanism

注意力机制是 LLM 判断哪些词元与其他词元相关的核心方法。在生成每个新词元之前，模型会将其与当前上下文窗口中的所有其他词元进行比较。

现代主流实现路径来自 [[Transformer]]。在这条路线里，[[Self-Attention]]、[[Scaled Dot-Product Attention]] 和 [[Multi-Head Attention]] 组成了注意力计算的核心骨架。

## 工作原理

- 模型将每个词元与窗口中所有其他词元进行两两比较，计算关系权重
- 这使得模型原则上可以将输入文本第一句的概念与最后一句的概念联系起来
- 在 Transformer 中，这个过程通常通过 Query / Key / Value 三组向量完成

## 两个关键代价

### 计算代价

上下文窗口中的词元数量翻倍，所需计算量大约增加**四倍**。更长的上下文处理更慢、更贵。

### 注意力分配不均

注意力在整个上下文窗口中分布不均匀。模型对输入**开头和结尾**的词元关注最多，**中间部分**的关注度显著下降。这就是 [[Lost in the Middle Problem]]。

相关研究发现，当相关信息位于输入中间时，准确率可能比位于开头或结尾时下降 30% 以上。

## 根本原因

这不是某个模型的 bug，而是 [[Transformer]] 架构的结构性特性。

大多数现代 LLM 使用的位置编码方法 **RoPE（Rotary Position Embedding）** 会引入衰减效应，导致远离序列开头和结尾的词元落入低注意力区域。较新的模型减轻了问题严重性，但没有任何生产模型完全消除它。

## 参见

- [[Attention Is All You Need]]
- [[Transformer]]
- [[Self-Attention]]
- [[Multi-Head Attention]]
- [[Context Window]]
- [[Context Engineering]]
- [[Lost in the Middle Problem]]
