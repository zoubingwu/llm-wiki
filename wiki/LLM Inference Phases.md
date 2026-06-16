---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - LLM
  - inference
  - serving
source_count: 1
---

# LLM Inference Phases

LLM 推理阶段（LLM Inference Phases）通常分为 prefill（预填充）和 decode（解码）两段。两段运行在同一模型上，却对 GPU 提出相反的物理要求。

## Prefill

Prefill 会把完整输入提示并行通过模型的每一层权重，生成响应的第一个词元，并产生 [[KV-Cache]]。这个阶段一次性处理所有输入词元，因此主要受 GPU 数学计算单元限制，属于计算受限（compute-bound）工作。

衡量 prefill 的核心指标是首次词元时间（Time to First Token, TTFT）。用户发送提示后看到第一个流式词元之前的停顿，主要来自这一阶段。

## Decode

Decode 会逐个生成后续词元。每个新词元都依赖前面的词元，因此模型需要为每个词元执行一次前向传播。长响应会让这个循环重复数百到数千次。

Decode 主要受内存带宽限制（memory-bandwidth-bound）。GPU 的数学吞吐量常常处于空闲状态，瓶颈来自每次前向传播读取模型权重的数据移动。衡量 decode 的核心指标是每秒词元数（Tokens Per Second, TPS）。

## 工程影响

这个拆分解释了推理优化技术的分类方式：

- [[Prefix Caching]] 主要减少 prefill 工作。
- [[Speculative Decoding]] 主要提高 decode 的 TPS。
- [[Model Quantization]] 同时降低计算成本和内存带宽压力。
- [[Disaggregated Inference Serving]] 直接把 prefill 和 decode 拆到不同服务与 GPU 池中。

## 相关概念

- [[AI Inference Engineering]]
- [[KV-Cache]]
- [[Inference Batching]]
- [[Model Quantization]]
- [[Speculative Decoding]]
