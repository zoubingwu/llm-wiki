---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - LLM
  - inference
  - serving
source_count: 1
---

# Inference Batching

推理合批（Inference Batching）是让推理引擎把多个请求按词元交织在一起处理的服务技术。它让单块 GPU 同时服务多个用户，从而提高总吞吐量。

## 工作方式

未合批的系统会把 GPU 资源集中给单个用户，用户能获得最低响应时间。合批系统会在多个请求之间调度计算，让 GPU 的计算能力持续被填满，减少空闲周期。

## 主要取舍

合批以单用户延迟换取系统总吞吐量。消费聊天工具通常更重视低延迟，批处理管线通常更重视吞吐量。推理服务的调度器需要根据产品形态选择合批大小、等待窗口和优先级策略。

## 与其他技术的关系

[[Speculative Decoding]] 在小 batch 下更容易发挥作用，因为 GPU 仍有空余计算能力用于验证候选词元。大 batch 下 GPU 已经被主工作负载填满，推测式解码的收益会降低。

## 相关概念

- [[AI Inference Engineering]]
- [[LLM Inference Phases]]
- [[Speculative Decoding]]
- [[Disaggregated Inference Serving]]
