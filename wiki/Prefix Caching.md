---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - LLM
  - inference
  - cache
source_count: 1
---

# Prefix Caching

前缀缓存（Prefix Caching）通过复用相同开头片段的 [[KV-Cache]] 来加速 prefill。多个请求共享同一段系统提示、工具定义或长上下文开头时，推理引擎可以只计算一次前缀，后续请求直接读取缓存结果。

## 命中边界

前缀缓存从序列开头开始命中，直到第一个差异词元为止。序列第一个词元发生变化时，后面内容即使高度相同，也无法复用这段前缀缓存。

这个性质让提示结构直接影响成本和延迟：稳定共享内容应放在前面，变化的用户输入应尽量靠后，让缓存有连续前缀可以复用。

## 工程价值

前缀缓存主要改善 [[LLM Inference Phases|prefill]]，降低首次词元时间（TTFT）和输入词元成本。API 厂商对 cached input tokens 给出更低价格，背后就是这个服务侧成本差异。

## 相关概念

- [[KV-Cache]]
- [[Context Engineering]]
- [[AI Inference Engineering]]
- [[Disaggregated Inference Serving]]
