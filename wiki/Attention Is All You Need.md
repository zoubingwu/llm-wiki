---
type: source
created: 2026-04-09
updated: 2026-04-09
tags:
  - paper
  - transformer
  - source
source_count: 1
---

# Attention Is All You Need

这是一篇 2017 年的经典论文，首次系统提出 [[Transformer]] 架构。它的核心结论是：在序列转换任务中，可以完全抛弃循环（RNN）和卷积（CNN），仅依靠注意力机制完成建模。

## 核心贡献

- 提出 [[Transformer]] 编码器-解码器架构
- 定义 [[Scaled Dot-Product Attention]]
- 提出 [[Multi-Head Attention]]
- 使用 [[Self-Attention]] 直接建模长距离依赖
- 使用 [[Positional Encoding]] 补充序列顺序信息

## 关键结果

- WMT 2014 英德翻译：Transformer (big) 达到 28.4 BLEU
- WMT 2014 英法翻译：Transformer (big) 达到 41.8 BLEU
- 训练速度显著快于当时主流的 RNN / CNN 方案
- 在英语成分句法分析任务中也展现了良好泛化能力

## 中文机翻校对记录

源文章中的中文对照存在明显机器翻译问题，录入时已按英文原文进行校正理解。典型错误包括：

- 把 “Abstract” 译成“抽象的”，正确应为“摘要”
- 把 “Transformer” 误写成“变形金刚”或“变压器”，在本 wiki 中统一保留 `Transformer`
- 把 “Self-Attention” 误写成“自我关注”，应为“自注意力”
- 把 “stack” 误写成“协议栈”，这里应理解为“层堆叠”
- 表格和说明中的 “operations / train / discriminative” 出现了“运营 / 火车 / 歧视性报道”等明显误译

这些错误不影响英文原文作为知识来源，但会影响中文检索和理解，因此相关 wiki 页面全部采用修正后的术语。

## 关联页面

- [[Transformer]]
- [[Attention Mechanism]]
- [[Self-Attention]]
- [[Scaled Dot-Product Attention]]
- [[Multi-Head Attention]]
- [[Positional Encoding]]
