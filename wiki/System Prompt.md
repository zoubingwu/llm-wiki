---
type: concept
created: 2026-08-21
updated: 2026-08-21
tags:
  - concept
  - LLM
  - agent
  - prompting
source_count: 2
---

# System Prompt

System prompt（系统提示）是放在用户请求和普通对话消息之外、用于规定模型行为与运行上下文的指令层。它可以描述角色、规则、工具使用方式、输出格式、推理力度和安全边界。

## 在 Agent Harness 中的作用

[[Agent Harness]] 通常会把 system prompt 与每次请求一起装配到对话中。它像新员工入职时收到的工作指引：模型没有把所有规则内化成不可改变的权重，但会在当前任务中遵循这些指令。

System prompt 可以规定：

- 模型在当前 harness 中是什么角色、目标和限制；
- 可调用工具的用途、参数和调用时机建议；
- 如何处理观察结果、错误、用户确认和最终输出；
- 是否进入 reasoning channel，以及采用何种 [[Reasoning Effort]]。

## 与训练内置规则的区别

模型训练阶段形成的规则和倾向嵌入模型权重；system prompt 是推理时注入的可变上下文。后者更容易由应用调整，但也会消耗上下文空间、影响 [[KV-Cache]]，并可能受到模型遵循能力与优先级规则的限制。

## 相关页面

- [[Agent Harness]]
- [[Context Engineering]]
- [[Reasoning Effort]]
- [[KV-Cache]]
- [[State Machine for Agents]]
