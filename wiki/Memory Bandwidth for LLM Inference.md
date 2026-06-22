---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - LLM
  - inference
  - hardware
  - memory
source_count: 2
---

# Memory Bandwidth for LLM Inference

LLM 推理内存带宽（Memory Bandwidth for LLM Inference）描述硬件每秒能从 GPU memory、unified memory 或 system memory 中喂给模型多少数据。它是 decode 阶段速度的关键约束。

## 为什么 decode 受带宽限制

在 [[LLM Inference Phases]] 中，decode 每次只生成一个 token。每个 token 都需要一次前向传播，并反复读取模型权重和 [[KV-Cache]]。这使 GPU 的数学单元常常等待数据移动，瓶颈落在 memory bandwidth 上。

因此，VRAM 容量回答“模型是否装得下”，memory bandwidth 回答“装下后每秒能生成多少 token”。

## 容量与带宽的分离

[[Memory Bandwidth for Local AI Hardware (2026 Edition)]] 强调本地 AI 硬件不能只看 memory pool 大小。大 unified memory 机器可能装下更大模型，但高端 HBM GPU 在模型装得下时能更快 decode。

这解释了为什么 32GB RTX 5090 和 96GB RTX PRO 6000 Blackwell 可以在许多模型上跑得很快，而 Mac Studio M3 Ultra、DGX Spark 或 Strix Halo 的价值更多来自单机容量或 coherent memory，而不是 raw decode speed。

## 影响因素

- 权重精度和量化格式：更低 bits per weight 会减少数据移动。
- KV cache 大小：长上下文和并发会增加 cache bandwidth pressure。
- Batch 和 scheduler：合批能提高总吞吐，但也改变 latency profile。
- Interconnect：多 GPU 场景中，PCIe / NVLink / RDMA 会成为新的带宽边界。
- 推理引擎：kernel、cache paging、offload 和 disaggregation 会改变实际带宽利用率。

## 相关概念

- [[Local AI Hardware]]
- [[LLM VRAM Sizing]]
- [[LLM Inference Phases]]
- [[Model Quantization]]
- [[Model Parallelism for Inference]]
- [[LLM Inference Engines]]
