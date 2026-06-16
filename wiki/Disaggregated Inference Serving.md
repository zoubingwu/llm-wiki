---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - LLM
  - inference
  - serving
  - architecture
source_count: 1
---

# Disaggregated Inference Serving

解耦式推理服务（Disaggregated Inference Serving）把 [[LLM Inference Phases|prefill 和 decode]] 运行在不同的 GPU 池或服务中。prefill 生成第一个词元和 [[KV-Cache]] 后，系统把 KV cache 通过高速网络发送给 decode 服务，再由 decode 服务继续生成后续词元。

## 为什么拆分

Prefill 是计算受限任务，decode 是内存带宽受限任务。把两者分开后，基础设施可以为每个阶段选择更合适的硬件、调度策略和扩容比例。

这也是一种更架构化的推理优化：它把两个阶段从同一推理引擎内部的调度问题，提升为两个服务之间的容量规划和数据传输问题。

## Conditional Disaggregation

条件解耦（Conditional Disaggregation）会根据请求形态决定是否跨服务交接。短请求或已经命中缓存的请求可以留在 decode engine 中完成，长提示请求则交给 prefill engine 先生成 KV cache。

这种策略更贴近真实流量，因为生产请求通常同时包含长提示、短提示、缓存命中和缓存缺失。

## 相关概念

- [[AI Inference Engineering]]
- [[LLM Inference Phases]]
- [[KV-Cache]]
- [[Prefix Caching]]
- [[Model Parallelism for Inference]]
