---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - LLM
  - inference
  - optimization
source_count: 1
---

# Speculative Decoding

推测式解码（Speculative Decoding）是一种加速 [[LLM Inference Phases|decode]] 的推理技术。它利用“生成候选词元昂贵、验证候选词元便宜”的不对称性，让主模型一次前向传播产出多个可接受词元。

## 工作方式

系统先用较小的 draft model 预测接下来若干词元，再让主模型在一次前向传播中验证这些候选词元。主模型接受与自身预测一致的候选，丢弃其余候选。

传统 decode 每次前向传播通常只生成一个词元；推测式解码让多个词元可能在同一次主模型验证中通过，因此提高每秒词元数（TPS）。

## 适用条件

推测式解码主要改善 TPS，对首次词元时间（TTFT）影响有限，因为 prefill 仍按原流程执行。它在小 batch 下效果更明显，此时 GPU 还有空余计算能力可以用于候选验证。

当 [[Inference Batching|batch]] 较大时，GPU 已经被主模型工作负载占满，推测式解码的额外验证会被动态关闭或收益下降。

## 相关概念

- [[AI Inference Engineering]]
- [[LLM Inference Phases]]
- [[Inference Batching]]
- [[Model Quantization]]
