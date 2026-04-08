---
type: concept
created: 2026-04-08
updated: 2026-04-08
tags:
  - LLM
  - context
  - attention
source_count: 1
---

# Lost in the Middle Problem

"迷失在中间"（Lost in the Middle）问题是 LLM 注意力分布不均的表现：模型对输入开头和结尾的内容关注最多，对中间部分的内容关注度显著下降。

## 发现

研究表明，当相关信息位于输入中间时，准确率可能比位于开头或结尾时**下降 30% 以上**。

## 根本原因

Transformer 模型使用的位置编码方法 **RoPE（Rotary Position Embedding）** 会引入距离衰减效应。距离序列开头和结尾都较远的词元会落入低注意力区域。

这不是某个特定模型的缺陷，而是几乎所有现代 Transformer 架构的结构属性。较新的模型减轻了严重性，但未完全消除。

## 实际影响

- 往 LLM 粘贴长文档时，中间页的信息最容易被遗漏
- 上下文工程需要刻意将信息放在开头或结尾，而非中间
- [[Context Engineering]] 策略中的 Compress（压缩）和 Select（选择）都直接应对这个问题

## 参考文献

- [Lost in the Middle: How Language Models Use Long Contexts](https://cs.stanford.edu/~nfliu/papers/lost-in-the-middle.arxiv2023.pdf)

## 参见

- [[Attention Mechanism]]
- [[Context Rot]]
- [[Context Engineering]]
