---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - LLM
  - inference
  - benchmark
  - serving
source_count: 1
---

# LLM Inference Benchmarking

LLM 推理基准测试（LLM Inference Benchmarking）是评估推理引擎、硬件和 workload 组合的测量方法。有效 benchmark 需要描述模型、权重、引擎、硬件、负载形态和指标，而不是只报告单用户 tokens per second。

## 必须描述的上下文

[[Inference Engines for LLMs & Local AI Hardware (2026 Edition)]] 给出了一组必要维度：

- **Model**：模型名、架构、参数量、MoE active params。
- **Weights**：dtype、quant format、group size、calibration。
- **Engine**：版本、commit、backend、flags。
- **Hardware**：GPU SKU、memory capacity、bandwidth、interconnect、CPU、RAM。
- **Workload**：输入 / 输出长度分布、concurrency、streaming、shared prefixes、structured output。
- **Metrics**：TTFT、TPOT、end-to-end latency、p50/p95/p99、tokens per second、requests per second、GPU memory usage、KV cache hit rate、prefill throughput、decode throughput、cost per 1M tokens。

## 常见错误

- 只用单用户 tokens per second 比较引擎。
- 用短 prompt demo 外推 coding agent、RAG service 或长上下文 workload。
- 混淆 prefill 和 decode 指标。
- 只看平均值，忽略 p95 / p99。
- 在目标 context length 下没有测 memory headroom。
- 没有单独测试 structured output、LoRA、多 LoRA 和 cache reuse。
- 驱动、CUDA、ROCm、模型或引擎升级后沿用旧 benchmark。

## 与系统设计的关系

推理 benchmark 的目的不是找到“最快引擎”，而是确认某个 [[LLM Inference Engines|推理引擎]]、[[Local AI Hardware|硬件]] 和 workload 组合是否满足产品约束。不同产品可能优化 latency、throughput、cost、privacy、portability 或 developer speed。

## 相关概念

- [[AI Inference Engineering]]
- [[LLM Inference Phases]]
- [[Memory Bandwidth for LLM Inference]]
- [[KV-Cache]]
- [[Inference Batching]]
- [[Disaggregated Inference Serving]]
