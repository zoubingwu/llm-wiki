---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - LLM
  - inference
  - local-ai
  - hardware
source_count: 3
---

# Local AI Hardware

本地 AI 硬件（Local AI Hardware）指用于在个人设备、工作站、边缘设备或自管服务器上运行开放 LLM 的硬件组合。判断这类硬件时，核心不是单个营销指标，而是容量、内存带宽和软件栈的乘积。

## 三个维度

- **容量（Capacity）**：模型权重、[[KV-Cache]]、activation、batching 和 runtime overhead 是否装得下。
- **带宽（Bandwidth）**：decode 阶段能多快反复读取权重和 cache，直接影响 tokens per second。
- **软件栈（Software Stack）**：推理引擎、kernel、scheduler、quantization format 和 driver 是否能兑现硬件规格。

[[Memory Bandwidth for Local AI Hardware (2026 Edition)]] 将这个关系概括为：Local AI hardware = capacity × bandwidth × software stack。

## 常见路线

- **Discrete GPU**：当模型装进 VRAM 时，NVIDIA、AMD 和 Intel discrete GPUs 通常提供更高带宽和 decode 速度。
- **Apple unified memory**：容量优势明显，适合单机装下更大模型，但带宽通常低于高端 HBM GPU。
- **x86 unified memory / Strix Halo**：让本地一体机拥有更大的 GPU-visible memory pool，但带宽属于中档。
- **AI PC / thin-and-light**：适合小模型、assistant 和 edge workload。
- **专用或开放 stack 硬件**：如 DGX Spark、Tenstorrent 等，取决于软件成熟度和目标 workload。

## 与推理引擎的关系

硬件决定 [[LLM Inference Engines]] 的可选范围。llama.cpp 更适合奇怪硬件和可移植性，MLX 适合 Apple Silicon，ExLlama 适合消费级 CUDA 量化推理，vLLM / SGLang / TensorRT-LLM 更偏生产 serving 和数据中心。

## 相关概念

- [[Self-hosted LLMs Local AI Hardware]]
- [[LLM VRAM Sizing]]
- [[Memory Bandwidth for LLM Inference]]
- [[LLM Inference Engines]]
- [[Model Quantization]]
- [[Model Parallelism for Inference]]
