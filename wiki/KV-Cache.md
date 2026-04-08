---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - LLM
  - inference
  - cache
  - cost
source_count: 1
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
