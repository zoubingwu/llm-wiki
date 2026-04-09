---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - transformer
  - attention
source_count: 1
---

# Self-Attention

自注意力（Self-Attention）是一种让序列中每个位置都可以直接读取同一序列其他位置信息的机制。它是 [[Transformer]] 的核心构件。

## 直观理解

对序列中的某个词元来说，自注意力会计算它与其他所有词元之间的相关性，再按权重聚合信息。这样模型不需要像 RNN 那样一步步传递状态，就能直接建立远距离依赖。

## 在 Transformer 中的作用

- 编码器使用自注意力，让每个输入位置都能看到整段输入
- 解码器也使用自注意力，但需要加掩码（mask），防止当前位置偷看未来词元

这种设计让 [[Transformer]] 具备高并行性，也是它训练速度显著快于传统循环结构的关键原因。

## 优势与代价

优势：

- 任意两个位置之间的最大路径长度为常数级
- 适合 GPU 并行计算
- 更容易学习长距离依赖

代价：

- 计算复杂度会随序列长度平方增长
- 长上下文时计算和显存成本很高

这也是 [[Attention Mechanism]] 和 [[Context Window]] 成为 LLM 系统设计核心约束的根本原因。

## 参见

- [[Scaled Dot-Product Attention]]
- [[Multi-Head Attention]]
- [[Attention Mechanism]]
