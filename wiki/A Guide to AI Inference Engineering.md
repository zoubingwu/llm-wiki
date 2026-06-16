---
type: source
created: 2026-06-16
updated: 2026-06-16
tags:
  - source
  - LLM
  - inference
  - serving
source_count: 1
---

# A Guide to AI Inference Engineering

这篇文章是 [[ByteByteGo]] 对 AI 推理工程（AI Inference Engineering）的系统介绍。它把 LLM 推理拆成 [[LLM Inference Phases|prefill 和 decode 两个阶段]]，再用这个拆分解释生产系统为什么要分别优化 TTFT、TPS、成本和可靠性。

源文见：[A Guide to AI Inference Engineering](../articles/A%20Guide%20to%20AI%20Inference%20Engineering.md)。

## 核心贡献

- 将 prefill 归纳为计算受限（compute-bound）的阶段，用首次词元时间（Time to First Token, TTFT）衡量。
- 将 decode 归纳为内存带宽受限（memory-bandwidth-bound）的阶段，用每秒词元数（Tokens Per Second, TPS）衡量。
- 解释开放模型（open models）和自托管如何把推理工程从前沿实验室扩散到普通产品团队。
- 梳理六类推理优化技术：[[Inference Batching]]、[[Prefix Caching]]、[[Model Quantization]]、[[Speculative Decoding]]、[[Model Parallelism for Inference]] 和 [[Disaggregated Inference Serving]]。
- 给出自建推理栈的投资信号：API 成本成为重要支出、延迟要求超过封闭 API 能力、可靠性要求高于供应商 SLA。

## 在当前 wiki 中的位置

这篇文章补齐了 [[Transformer]]、[[Attention Mechanism]]、[[KV-Cache]] 与生产模型服务之间的工程链路。它关注训练完成之后的运行阶段，也让 [[Context Engineering]] 中的提示结构、缓存命中率和成本问题有了更底层的服务侧解释。

## 关联页面

- [[AI Inference Engineering]]
- [[LLM Inference Phases]]
- [[KV-Cache]]
- [[Transformer]]
- [[Attention Mechanism]]
- [[Context Engineering]]
- [[Cursor]]
