---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - LLM
  - inference
  - serving
  - infrastructure
source_count: 1
---

# AI Inference Engineering

AI 推理工程（AI Inference Engineering）是在生产环境中高效运行已训练 AI 模型的工程实践。它覆盖底层 GPU 代码、模型服务框架和云基础设施，目标是在延迟、吞吐量、成本和质量之间做产品化取舍。

## 核心问题

LLM 推理的结构性约束来自 [[LLM Inference Phases|prefill 和 decode]] 的物理差异：

- prefill 一次性处理完整输入提示，受 GPU 算力限制，核心指标是首次词元时间（Time to First Token, TTFT）。
- decode 逐个生成后续词元，受内存带宽限制，核心指标是每秒词元数（Tokens Per Second, TPS）。

推理工程的大部分优化都围绕这个拆分展开：让 prefill 更快、让 decode 更快，或者重新组织系统让两者独立扩展。

## 主要技术

- [[Inference Batching]] — 通过合批提高单 GPU 总吞吐量。
- [[Prefix Caching]] — 复用相同前缀的 [[KV-Cache]]，减少 prefill 计算。
- [[Model Quantization]] — 用低精度格式压缩模型权重，降低计算和内存带宽压力。
- [[Speculative Decoding]] — 用小模型草拟候选词元，再由主模型批量验证。
- [[Model Parallelism for Inference]] — 用 tensor parallelism 和 expert parallelism 把模型分布到多 GPU。
- [[Disaggregated Inference Serving]] — 将 prefill 和 decode 运行在不同 GPU 池中，并在服务间传递 KV cache。

## 投资时机

早期 AI 产品通常优先使用成熟 API 来换取迭代速度。自托管开放模型和自建推理栈更适合约束已经清晰的阶段：API 成本成为显著支出、交互延迟成为产品核心体验、可靠性要求超过供应商 SLA。

[[A Guide to AI Inference Engineering]] 将 [[Cursor]] Composer 2.0 作为代表案例：代码补全的亚秒级延迟就是产品体验本身，因此开放模型加推理工程投入能直接服务产品约束。

## 相关概念

- [[LLM Inference Phases]]
- [[KV-Cache]]
- [[Transformer]]
- [[Attention Mechanism]]
- [[Context Engineering]]
