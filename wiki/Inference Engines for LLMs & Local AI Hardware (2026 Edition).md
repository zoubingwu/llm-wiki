---
type: source
created: 2026-06-22
updated: 2026-06-22
tags:
  - source
  - LLM
  - inference
  - local-ai
  - serving
source_count: 1
---

# Inference Engines for LLMs & Local AI Hardware (2026 Edition)

这篇文章是 [[Self-hosted LLMs Local AI Hardware]] 系列第 3 部分，主题是 LLM 推理引擎。文章的核心观点是：先确定硬件策略、工作负载形态和 serving model，再选择推理引擎。

源文见：[Inference Engines for LLMs & Local AI Hardware (2026 Edition)](../articles/Inference%20Engines%20for%20LLMs%20%26%20Local%20AI%20Hardware%20%282026%20Edition%29.md)。

## 系列位置

- 上一篇：[[Memory Bandwidth for Local AI Hardware (2026 Edition)]]
- 本篇：[[Inference Engines for LLMs & Local AI Hardware (2026 Edition)]]
- 下一篇：无
- 系列总览：[[Self-hosted LLMs Local AI Hardware]]

## 核心贡献

- 把 [[LLM Inference Engines]] 定义为 traffic cop、memory manager、kernel dispatcher、scheduler、cache accountant、parallelism planner、API surface 和 deployment framework 的组合。
- 按用途划分引擎家族：portable local runtimes、Apple / unified-memory runtimes、consumer CUDA quant engines、production serving engines，以及 Dynamo 这类 orchestration layer。
- 建立引擎选择映射：llama.cpp 负责 portability，MLX / MLX-LM 负责 Mac-first workflow，ExLlamaV2/V3 负责消费级 CUDA 量化本地推理，vLLM 是开源生产服务默认起点，SGLang 适合 long context / MoE / routing，TensorRT-LLM 追求 NVIDIA max performance。
- 将 [[LLM Inference Phases]]、[[KV-Cache]]、[[Memory Bandwidth for LLM Inference]]、interconnect、scheduler quality 和 runtime overhead 放进同一个性能模型。
- 总结 [[LLM Inference Benchmarking]] 所需维度：model、weights、engine、hardware、workload、metrics，以及 TTFT、TPOT、p95/p99、KV cache hit rate、prefill/decode throughput 等指标。

## 中文翻译说明

根据本次 ingest 要求，三篇系列文章中只有本篇添加了中文翻译。英文原文保持在前，中文翻译作为独立章节附在文末。

## 关联页面

- [[LLM Inference Engines]]
- [[LLM Inference Benchmarking]]
- [[Local AI Hardware]]
- [[AI Inference Engineering]]
- [[LLM Inference Phases]]
- [[KV-Cache]]
- [[Disaggregated Inference Serving]]
- [[GPU Memory Math for LLMs (2026 Edition)]]
- [[Memory Bandwidth for Local AI Hardware (2026 Edition)]]
