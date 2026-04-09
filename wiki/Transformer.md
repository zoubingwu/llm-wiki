---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - transformer
  - attention
  - architecture
source_count: 1
---

# Transformer

Transformer 是由论文 [[Attention Is All You Need]] 提出的序列转换（sequence transduction）架构。它的核心变化是用注意力机制（attention）替代传统的循环神经网络（RNN）和卷积神经网络（CNN）作为主干。

## 核心结构

Transformer 仍然保留编码器-解码器（encoder-decoder）总体框架，但每一层主要由两类模块组成：

- [[Multi-Head Attention]]（多头注意力）
- 逐位置前馈网络（position-wise feed-forward network）

编码器由 6 层相同结构堆叠而成；解码器也由 6 层构成，但额外包含一层对编码器输出做注意力读取的交叉注意力。

## 关键设计

- 用 [[Self-Attention]] 直接建模序列中任意两个位置之间的依赖
- 用 [[Positional Encoding]] 注入位置信息，弥补“没有递归、也没有卷积”带来的顺序感缺失
- 用残差连接（residual connection）和层归一化（layer normalization）稳定训练

## 为什么重要

这篇论文的价值不只是提出了一个新模块，而是确立了后续大多数大型语言模型（LLM）的基础架构路线。今天讨论的 [[Attention Mechanism]]、上下文窗口（[[Context Window]]）和长上下文成本，本质上都继承自 Transformer 的计算方式。

## 论文中的结果

论文报告：

- WMT 2014 英德翻译任务上，Transformer (big) 达到 28.4 BLEU
- WMT 2014 英法翻译任务上，Transformer (big) 达到 41.8 BLEU
- 在英语成分句法分析（English constituency parsing）任务上也表现出良好泛化

## 参见

- [[Self-Attention]]
- [[Scaled Dot-Product Attention]]
- [[Multi-Head Attention]]
- [[Positional Encoding]]
- [[Attention Mechanism]]
