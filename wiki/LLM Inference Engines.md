---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - LLM
  - inference
  - serving
  - runtime
source_count: 1
---

# LLM Inference Engines

LLM 推理引擎（LLM Inference Engines）是把模型权重、硬件、量化格式、KV cache、调度、API 和并行策略组织成可运行推理服务的软件层。

## 它负责什么

[[Inference Engines for LLMs & Local AI Hardware (2026 Edition)]] 将推理引擎描述为 traffic cop、memory manager、kernel dispatcher、scheduler、cache accountant、parallelism planner、API surface 和 deployment framework。

严肃推理引擎通常负责：

- 加载权重和 tokenizer。
- 运行 prefill / decode forward pass。
- 维护 [[KV-Cache]]，支持 prefix caching 或 paged attention。
- 处理 batching、scheduling、公平性和 starvation。
- 支持 quantization format、并行执行、streaming 和 structured output。
- 暴露 OpenAI-compatible API、metrics、observability 和分布式执行能力。

## 引擎家族

- **Portable local runtimes**：llama.cpp、MLC LLM、ONNX Runtime GenAI、OpenVINO。目标是让模型在各种硬件上跑起来。
- **Apple / unified-memory runtimes**：MLX、MLX-LM。目标是用好 Apple Silicon 的统一内存和 Mac-first workflow。
- **Consumer CUDA quant engines**：ExLlamaV2、ExLlamaV3。目标是在消费级 NVIDIA GPU 上高效运行低 bit 权重。
- **Production serving engines**：vLLM、SGLang、TensorRT-LLM、TGI、LMDeploy。目标是服务并发用户、长上下文、MoE、观测、成本和 SLA。
- **Orchestration layers**：NVIDIA Dynamo 等位于引擎之上，处理 routing、prefill/decode disaggregation、KV-aware routing 和 autoscaling。

## 选择原则

不要先选引擎。先回答硬件、模型是否装进 fast memory、prefill / decode 瓶颈、context length、concurrency、模型架构、量化格式、interconnect 和运维目标。

本地便利、生产服务和 fleet orchestration 是三类不同需求。llama.cpp、MLX、ExLlama、vLLM、SGLang、TensorRT-LLM 和 Dynamo 的边界主要由这些需求决定。

## 相关概念

- [[AI Inference Engineering]]
- [[LLM Inference Phases]]
- [[LLM Inference Benchmarking]]
- [[Local AI Hardware]]
- [[Memory Bandwidth for LLM Inference]]
- [[Disaggregated Inference Serving]]
- [[Model Parallelism for Inference]]
