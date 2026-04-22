---
type: source
created: 2026-04-22
updated: 2026-04-22
tags:
  - source
  - AI
  - agent
  - context
source_count: 1
---

# Context Engineering for AI Agents Lessons from Building Manus

这篇文章提供了 [[Manus]] 团队构建生产级 AI 智能体的实战经验，重点讨论如何围绕缓存、工具空间、外部记忆与错误恢复来设计 agent 上下文。

源文见：[Context Engineering for AI Agents: Lessons from Building Manus](../articles/Context%20Engineering%20for%20AI%20Agents%20Lessons%20from%20Building%20Manus.md)。

## 核心贡献

- 把 KV-cache 命中率定义为生产级 agent 的核心运行指标之一
- 提出“Mask, Don't Remove”，强调用状态机和词元屏蔽约束动作空间
- 将 [[File System as Context]] 视为 agent 的终极外部记忆层
- 提出通过重复读写维持目标在上下文尾部的注意力工程方法
- 强调保留错误痕迹有助于提升恢复能力
- 讨论少样本提示在 agent 场景里可能产生模式僵化副作用

## 文章中的六个原则

- [[KV-Cache]]
- [[State Machine for Agents]]
- [[File System as Context]]
- [[Recitation for Attention Manipulation]]
- [[Keep Errors in Context]]
- [[Few-Shot Prompting in Agents]]

## 中文校对说明

源文附带中文对照，录入时已按英文原文修正了若干术语和表达问题。已有概念页中的中文总结以校对后的含义为准。

## 关联页面

- [[Manus]]
- [[Context Engineering]]
- [[Agent Loop]]
- [[Masking Tool Logits]]
- [[Stochastic Graduate Descent]]
