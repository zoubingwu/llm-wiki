---
type: entity
created: 2026-04-08
updated: 2026-04-08
tags:
  - entity
  - company
source_count: 1
---

# Anthropic

Anthropic 是一家人工智能公司，开发了 Claude 系列模型。

## 相关贡献

- **多 agent 研究系统**：通过首席 Opus 4 agent 委派任务给 Sonnet 4 子 agent，在研究任务上比单个 Opus 4 提升了 90.2%[[Multi-agent System]]
  - 所有性能提升来自上下文管理的优化，而非更强大的模型
  - 首席研究员 agent 使用外部存储器（scratchpad）保存计划，防止上下文截断时丢失[[Scratchpads]]
- 系统描述见 [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)

## 参见

- [[Multi-agent System]]
- [[Scratchpads]]
- [[Context Engineering]]
