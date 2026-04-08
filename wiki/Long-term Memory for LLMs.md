---
type: concept
created: 2026-04-08
updated: 2026-04-08
tags:
  - LLM
  - memory
  - persistence
source_count: 1
---

# Long-term Memory for LLMs

长期记忆指 LLM 跨会话持久化信息的能力。

## 为什么需要

LLM 是无状态的，每次调用之间**零记忆**。当 ChatGPT 似乎"记住"之前说过什么，实际上是系统在每次调用时将对话历史重新注入到上下文窗口中。模型本身什么都不记得。

长期记忆系统把外部存储当作**真正的记忆层**，而上下文窗口仅作为临时工作区。

## 实际案例

- **ChatGPT** — 自动从对话中生成用户偏好记忆
- **Cursor / Windsurf** — 学习编码习惯和项目上下文
- **Claude Code** — 使用 CLAUDE.md 文件作为持久化指令记忆

## 在 Context Engineering 中的位置

属于 [[Context Engineering]] 的 **Write（写入）** 策略。

## 与 Scratchpads 的区别

- 长期记忆：跨会话持久化（偏好、模式、知识）
- [[Scratchpads]]：单次长任务中的中间步骤保存

## 参见

- [[Scratchpads]]
- [[Context Engineering]]
- [[LLM Wiki Pattern]]
