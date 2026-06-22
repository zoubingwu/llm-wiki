---
type: concept
created: 2026-06-16
updated: 2026-06-22
tags:
  - LLM
  - inference
  - GPU
  - serving
source_count: 3
---

# Model Parallelism for Inference

推理中的模型并行（Model Parallelism for Inference）是在单块 GPU 容量或延迟达不到要求时，把大模型分布到多块 GPU 上运行的技术。开放模型服务中常见的两类做法是 tensor parallelism 和 expert parallelism。

## Tensor Parallelism

张量并行（Tensor Parallelism）会把模型每一层拆分到多块 GPU。每块 GPU 持有每一层的一部分，并共同完成一次前向传播。

这种方式需要高带宽互连，例如 NVIDIA NVLink，因为每一层计算结束后都要合并各 GPU 的中间结果。它适合服务大型 dense model，通信成本由分摊单层计算带来的速度收益抵消。

## Expert Parallelism

专家并行（Expert Parallelism）主要用于 mixture-of-experts models。MoE 模型每个词元只激活一部分参数，因此可以把不同 experts 分布到不同 GPU，让词元按路由结果访问所需 experts。

expert parallelism 的通信开销通常低于 tensor parallelism，更适合跨节点部署。生产系统常把两者组合起来：节点内使用 tensor parallelism，节点间使用 expert parallelism。

## 互连约束

[[Memory Bandwidth for Local AI Hardware (2026 Edition)]] 和 [[Inference Engines for LLMs & Local AI Hardware (2026 Edition)]] 都强调，多 GPU 扩展会把瓶颈从单卡显存和带宽推向 interconnect、topology、sync overhead 和 software maturity。

Tensor parallelism 对 NVLink / NVSwitch 这类高带宽互连更敏感。没有强互连时，pipeline parallelism 可能更适合某些部署。MoE 模型还需要考虑 expert routing 带来的 all-to-all traffic。

## 相关概念

- [[AI Inference Engineering]]
- [[LLM Inference Phases]]
- [[Transformer]]
- [[Disaggregated Inference Serving]]
- [[Local AI Hardware]]
- [[LLM Inference Engines]]
