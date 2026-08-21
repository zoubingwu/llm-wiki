---
type: concept
created: 2026-08-21
updated: 2026-08-21
tags:
  - concept
  - LLM
  - reasoning
  - inference
source_count: 1
---

# Reasoning Effort

Reasoning effort（推理力度）描述模型在回答前投入多少中间推理工作的行为倾向。[[What Is Reasoning]] 认为它并不只是采样器上的一个独立预算，而是通过 system prompt（系统提示）和训练得到的输出约定共同塑造的行为。

## 主要机制

- GPT-OSS 可以在 system prompt 中加入 `Reasoning: low`，由模型学习是否切换到 `analysis` channel。
- DwarfStar 对 DeepSeek 的最大推理模式使用更详细的系统指令，要求模型彻底分解问题、检查边界情况和对抗性路径。
- 改变 reasoning effort 会改变 system prompt，因此可能破坏已有的 [[KV-Cache]] 前缀缓存。
- 关闭推理有时并不是让模型获得了新的“非思考能力”，而是通过 prefill 或 token 边界让模型跳过通常的思考 channel。

## 一个重要的边界

Reasoning effort 是控制行为的接口，不等于对模型内部真实认知过程的精确测量。不同模型可能用不同格式表达或隐藏中间工作；启用更高力度也不自动保证最终答案正确。

## 相关页面

- [[What Is Reasoning]]
- [[Reasoning Traces]]
- [[KV-Cache]]
- [[LLM Inference Phases]]
- [[State Machine for Agents]]
