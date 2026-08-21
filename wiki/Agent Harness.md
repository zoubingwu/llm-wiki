---
type: concept
created: 2026-08-21
updated: 2026-08-21
tags:
  - concept
  - agent
  - harness
  - AI
source_count: 1
---

# Agent Harness

Agent harness（智能体 Harness）是包裹 AI 模型、为其提供运行环境的软件层。它不是模型本身，也不只是一个聊天 UI，而是把模型放入一个有指令、工具、行动循环和模型适配边界的系统中。

## 四个核心职责

- **System Prompt（系统提示）**：把该 harness 的行为规范注入每次对话，类似新员工开始工作时收到的岗位指引。
- **Tools（工具）**：以代码提供搜索、写代码、发邮件等能力，并将工具描述交给模型；harness 通常不替模型决定每次调用时机。
- **Agentic Loop（智能体循环）**：让模型理解请求、调用工具、观察结果、检查是否满足目标，并在必要时继续循环。
- **Model Translation Layer（模型翻译层）**：把统一的 harness 能力映射到 Anthropic、OpenAI 或开放权重模型的不同接口。

## Harness 与模型、应用的区别

模型提供从文本到文本或工具调用的生成能力；harness 负责上下文装配、工具执行、循环控制、会话保存和模型切换；应用则可以在 harness 之上提供特定产品界面。一个 harness 可以通过 Terminal、聊天应用、邮件等多种界面使用。

## 用户自主权

与模型权重不同，harness 通常可以由终端用户拥有、在本地运行和修改。用户可以调整 system prompt、增加 extension、切换模型，并把不同模型的结果和会话保存在一个地方。[[What is a Harness]] 将这种可拥有、可改造、可切换的中立开源 harness 视为一种用户自主权工具。

## 与云运行时的关系

本地 harness 可以把模型、工具和会话放在用户自己的设备上；[[Cloud Agent Runtime]] 则需要进一步划分可信主机、可丢弃沙盒、作用域凭证和审计边界。harness 是 agent 的运行环境抽象，但不自动解决所有安全和持久化问题。

## 相关页面

- [[What is a Harness]]
- [[Agent Loop]]
- [[Model Translation Layer]]
- [[System Prompt]]
- [[Cloud Agent Runtime]]
- [[Pi]]
