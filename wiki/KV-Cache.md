---
type: concept
created: 2026-04-09
updated: 2026-06-16
tags:
  - LLM
  - inference
  - cache
  - cost
source_count: 2
---

# KV-Cache

KV-Cache（Key-Value Cache，键值缓存）是 LLM 推理中的缓存机制，用于存储计算过的 attention key-value 对，避免为相同前缀重复计算。

## 对 AI 智能体的重要性

Manus 认为 **KV-Cache 命中率是生产阶段 AI 智能体最重要的指标**，直接关联延迟和成本。

## 原因

智能体与聊天机器人的关键区别：
- 智能体上下文随每个工具调用而增长，输出却很短（结构化函数调用）
- Manus 的平均输入输出词元比例约 **100:1**
- 前缀相同的上下文可复用 KV-Cache，极大降低 TTFT（Time‑To‑First‑Token）和推理成本

## 在推理服务中的作用

[[LLM Inference Phases|Prefill]] 阶段会处理完整输入提示，并输出响应的第一个词元和 KV-Cache。后续 decode 阶段可以引用这些注意力中间值，持续生成后续词元。

[[Prefix Caching]] 会复用共享开头片段的 KV-Cache：系统提示、工具定义或长上下文前缀保持一致时，推理引擎可以减少重复 prefill 计算。[[Disaggregated Inference Serving]] 则会把 prefill 生成的 KV-Cache 通过网络发送给 decode engine，让两类工作负载独立扩展。

KV-Cache 对 [[Model Quantization]] 也更敏感。缓存中的精度误差会沿后续词元生成过程传播，因此生产系统需要谨慎选择 KV cache 的量化策略。

## 成本差异举例

- Claude Sonnet：缓存的输入词元为 0.30 USD/MTok，未缓存为 3 USD/MTok（**10 倍** 差距）

## 上下文工程中的 KV-Cache 优化实践

1. **保持提示前缀稳定** — LLM 的自回归特性导致单个词元差异就会使后续缓存失效。不要在系统提示开头放时间戳（尤其秒级）。
2. **上下文仅追加** — 避免修改之前的动作或观察结果，确保序列化确定性（JSON key 顺序要稳定）。
3. **显式标记缓存断点** — 当模型/框架不支持自动增量缓存时，手动插入断点。
4. **启用 prefix/prompt caching** — 使用 vLLM 等自托管时打开相关配置，用 session ID 在分布式 workers 间一致路由请求。

## 相关概念

- [[Context Engineering]] — KV-Cache 是上下文工程的核心成本考虑
- [[Agent Loop]]
- [[Manus]] — 实战案例来源
- [[LLM Inference Phases]]
- [[Prefix Caching]]
- [[Disaggregated Inference Serving]]
- [[Model Quantization]]
