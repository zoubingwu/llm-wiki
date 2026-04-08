---
type: concept
created: 2026-04-08
updated: 2026-04-08
tags:
  - LLM
  - agent
  - multi-agent
source_count: 1
---

# Multi-agent System

多 agent 架构将一个复杂任务拆分给多个专业化的 agent，每个 agent 拥有自己干净、专注的上下文。

## 为什么需要

当太多类型的信息在一个上下文窗口中竞争时，会导致**注意力稀释**和**上下文干扰**。多 agent 通过隔离解决此问题。

## 在 Context Engineering 中的位置

属于 [[Context Engineering]] 的 **Isolate（隔离）** 策略。

## 实际案例

Anthropic 的多 agent 研究系统：
- 一个 Opus 4 作为首席研究员 agent，将子任务委派给 Sonnet 4 子 agent
- "研究" agent 的上下文装满了搜索工具和检索到的文档
- "撰稿" agent 的上下文装满了风格指南和格式规则
- 研究任务上比单个 Opus 4 提升了 **90.2%**，使用相同的模型家族
- 全部性能提升来自上下文管理方式的优化，而非更强大的模型

## 争论

其他研究（如 [[Cognition]]/Devin）认为，具有良好压缩能力的**单 agent** 比多 agent 更稳定、成本更低。答案取决于任务复杂度、成本容忍度和可靠性要求。

## 参见

- [[Context Engineering]]
- [[Scratchpads]]
