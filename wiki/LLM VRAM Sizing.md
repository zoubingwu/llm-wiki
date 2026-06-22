---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - LLM
  - inference
  - GPU
  - memory
source_count: 1
---

# LLM VRAM Sizing

LLM 显存估算（LLM VRAM Sizing）是根据参数量、权重精度和运行时额外开销，估算本地或自托管模型需要多少 GPU memory 的方法。

## 基础公式

[[GPU Memory Math for LLMs (2026 Edition)]] 给出的权重显存近似公式是：

`VRAM (GB) ≈ Parameters (billions) × (effective bits per weight ÷ 8)`

典型直觉：

- FP16 / BF16：约 2 GB per 1B parameters。
- FP8 / INT8：约 1 GB per 1B parameters。
- 4-bit quantization：约 0.5 GB per 1B parameters。
- GGUF Q_K variants 介于 2-bit 到 6-bit 之间，实际数字依赖具体 scheme 和 runtime。

## 额外显存税

权重只是显存预算的一部分。实际运行还需要：

- [[KV-Cache]]：随 context length、batch size 和 concurrency 增长。
- Activations：依赖 runtime、execution path 和优化程度。
- Batching / concurrency：多请求会快速放大内存使用。
- Framework overhead：Transformers、vLLM、TensorRT-LLM、llama.cpp 等 runtime 的保留内存不同。
- CUDA Graphs：用额外 reserved memory 换取更稳定的延迟和吞吐。

经验上，安全运行常需要在权重估算之外增加 10-30% VRAM，长上下文、agent workload 和高并发会需要更多。

## MoE 的特殊性

Mixture-of-Experts（MoE）模型需要同时看 total parameters 和 active parameters。Total parameters 决定模型加载的内存 footprint，active parameters 更直接影响每个 token 的计算速度。

## 相关概念

- [[Model Quantization]]
- [[KV-Cache]]
- [[Local AI Hardware]]
- [[Memory Bandwidth for LLM Inference]]
- [[LLM Inference Engines]]
