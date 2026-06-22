---
type: source
created: 2026-06-22
updated: 2026-06-22
tags:
  - source
  - LLM
  - inference
  - local-ai
  - GPU
source_count: 1
---

# GPU Memory Math for LLMs (2026 Edition)

这篇文章是 [[Self-hosted LLMs Local AI Hardware]] 系列第 1 部分，主题是用参数量和权重精度估算本地运行 LLM 所需的显存。文章的核心公式是：VRAM（GB）≈ 参数量（billions）×（effective bits per weight ÷ 8）。

源文见：[GPU Memory Math for LLMs (2026 Edition)](../articles/GPU%20Memory%20Math%20for%20LLMs%20%282026%20Edition%29.md)。

## 系列位置

- 上一篇：无
- 本篇：[[GPU Memory Math for LLMs (2026 Edition)]]
- 下一篇：[[Memory Bandwidth for Local AI Hardware (2026 Edition)]]
- 系列总览：[[Self-hosted LLMs Local AI Hardware]]

## 核心贡献

- 用 [[LLM VRAM Sizing]] 公式统一解释 FP16 / BF16、FP8 / INT8、4-bit quantization、GGUF Q_K variants 等格式的权重显存。
- 给出 7B、13B、70B、405B 模型在 FP16、FP8 和 4-bit 下的大致权重显存规模。
- 把本地 GPU 档位翻译成“能装下多少模型权重”：8GB、12GB、16GB、24GB、48GB 和 80GB VRAM 分别对应不同参数量上限。
- 提醒权重只是显存账单的一部分，[[KV-Cache]]、activations、batching / concurrency、framework overhead 和 CUDA Graphs 都会增加额外 VRAM tax。
- 说明 MoE 模型中 total parameters 影响内存占用，active parameters 影响速度。
- 强调 GGUF 是容器和量化策略，内存数字高度依赖 llama.cpp-style runtime，迁移到其他框架可能发生 dequantization 和内存跳涨。

## 关联页面

- [[LLM VRAM Sizing]]
- [[Model Quantization]]
- [[KV-Cache]]
- [[Local AI Hardware]]
- [[GPU Memory Math for LLMs (2026 Edition)]]
- [[Memory Bandwidth for Local AI Hardware (2026 Edition)]]
- [[Inference Engines for LLMs & Local AI Hardware (2026 Edition)]]
