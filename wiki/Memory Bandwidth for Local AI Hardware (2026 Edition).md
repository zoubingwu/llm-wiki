---
type: source
created: 2026-06-22
updated: 2026-06-22
tags:
  - source
  - LLM
  - inference
  - local-ai
  - hardware
source_count: 1
---

# Memory Bandwidth for Local AI Hardware (2026 Edition)

这篇文章是 [[Self-hosted LLMs Local AI Hardware]] 系列第 2 部分，主题是本地 AI 硬件的内存带宽。文章把本地 AI 硬件抽象为 capacity × bandwidth × software stack：容量决定模型是否装得下，带宽决定 decode 速度，软件栈决定规格表能兑现多少。

源文见：[Memory Bandwidth for Local AI Hardware (2026 Edition)](../articles/Memory%20Bandwidth%20for%20Local%20AI%20Hardware%20%282026%20Edition%29.md)。

## 系列位置

- 上一篇：[[GPU Memory Math for LLMs (2026 Edition)]]
- 本篇：[[Memory Bandwidth for Local AI Hardware (2026 Edition)]]
- 下一篇：[[Inference Engines for LLMs & Local AI Hardware (2026 Edition)]]
- 系列总览：[[Self-hosted LLMs Local AI Hardware]]

## 核心贡献

- 把 [[Local AI Hardware]] 分成几个带宽档位：约 1.8 TB/s 的高端 discrete GPU、约 800 GB/s 的 Apple Ultra、450-650 GB/s workstation tier、250-300 GB/s unified-memory tier，以及 150 GB/s 左右 thin-and-light AI PC tier。
- 强调 [[Memory Bandwidth for LLM Inference]] 是 decode 性能的第一层判断，但容量和软件栈仍会改变实际结果。
- 比较 discrete GPU、Apple unified memory、DGX Spark、Strix Halo / Ryzen AI Max、AI PC、Tenstorrent 等路线的取舍。
- 提醒 fitting 和 serving 是两回事：模型能跑起来之后，仍会受到 decode bandwidth、KV cache、dequantization、batching、scheduler 和 framework overhead 限制。
- 说明多 GPU 扩展需要考虑 PCIe / NVLink / RDMA 等 interconnect、拓扑、同步开销和软件成熟度。

## 关联页面

- [[Memory Bandwidth for LLM Inference]]
- [[Local AI Hardware]]
- [[LLM Inference Phases]]
- [[Model Parallelism for Inference]]
- [[LLM VRAM Sizing]]
- [[GPU Memory Math for LLMs (2026 Edition)]]
- [[Inference Engines for LLMs & Local AI Hardware (2026 Edition)]]
