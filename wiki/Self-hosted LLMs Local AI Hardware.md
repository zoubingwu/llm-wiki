---
type: overview
created: 2026-06-22
updated: 2026-06-22
tags:
  - LLM
  - inference
  - local-ai
  - hardware
source_count: 3
---

# Self-hosted LLMs Local AI Hardware

自托管 LLM / 本地 AI 硬件（Self-hosted LLMs / Local AI Hardware）是一组围绕本地运行开放模型的系统设计问题：模型是否装得下、decode 是否足够快、软件栈是否能把硬件规格兑现成真实吞吐和延迟。

这个系列由 [[Ahmad Osman]] 发布，共三篇：

1. [[GPU Memory Math for LLMs (2026 Edition)]] — 用参数量和 bits per weight 估算模型权重显存。
2. [[Memory Bandwidth for Local AI Hardware (2026 Edition)]] — 用容量、带宽和软件栈判断本地 AI 硬件档位。
3. [[Inference Engines for LLMs & Local AI Hardware (2026 Edition)]] — 用硬件策略、工作负载形态和服务模型选择推理引擎。

## 系列主线

第一篇建立 [[LLM VRAM Sizing]]：权重显存大致等于参数量乘以有效 bits per weight，再加上 KV cache、activation、batching、framework overhead 和 CUDA Graphs 等额外开销。

第二篇建立 [[Memory Bandwidth for LLM Inference]]：容量决定模型是否装得下，带宽决定 decode 速度，软件栈决定规格表能兑现多少。

第三篇建立 [[LLM Inference Engines]]：推理引擎不是模型，而是内存管理器、scheduler、KV cache accountant、parallelism planner 和 API surface。引擎选择应跟随硬件、量化格式、互连、上下文长度、并发和生产成熟度。

## 与已有推理工程页面的关系

[[A Guide to AI Inference Engineering]] 从生产系统角度解释 [[LLM Inference Phases]]、batching、prefix caching、quantization、speculative decoding、model parallelism 和 disaggregation。这个系列把同一套概念落到本地硬件和推理引擎选择上，特别强调 [[Local AI Hardware]]、消费级 GPU、Apple unified memory、GGUF / EXL formats、vLLM、SGLang、TensorRT-LLM 和 llama.cpp 的取舍。

## 关联页面

- [[Local AI Hardware]]
- [[LLM VRAM Sizing]]
- [[Memory Bandwidth for LLM Inference]]
- [[LLM Inference Engines]]
- [[LLM Inference Benchmarking]]
- [[AI Inference Engineering]]
- [[Model Quantization]]
- [[KV-Cache]]
- [[Model Parallelism for Inference]]
