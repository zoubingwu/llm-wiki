---
type: concept
created: 2026-04-08
updated: 2026-04-08
tags:
  - LLM
  - 智能体
  - memory
source_count: 1
---

# Scratchpads

Scratchpads（草稿本）是智能体在执行长时间任务时，将中间计划、笔记和推理步骤保存到外部存储的方法。

## 为什么需要

当上下文窗口超过一定大小时（如 200,000 词元），LLM 的上下文会被截断，智能体的计划会丢失。通过将计划写入外部存储，可以跨调用保留关键信息。

## 在 Context Engineering 中的位置

属于 [[Context Engineering]] 的 **Write（写入）** 策略。

## 实际案例

[[Anthropic]] 的多智能体研究系统中，首席研究员智能体在任务开始时就将其计划写入外部存储器。如果上下文窗口超过 20 万词元而被截断，计划也不会丢失。

## 与 Long-term Memory 的区别

- Scratchpads 关注单次长时间任务中的中间步骤保存
- [[Long-term Memory for LLMs]] 关注跨会话的持久化（用户偏好、编码风格等）

## 参见

- [[Long-term Memory for LLMs]]
- [[Multi-agent System]]
