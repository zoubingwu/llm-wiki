---
type: source
created: 2026-08-21
updated: 2026-08-21
tags:
  - source
  - agent
  - harness
  - open-source
source_count: 1
---

# What is a Harness?

Earendil 发布的 agent harness（智能体 Harness）入门文章。文章用攀岩安全带作比喻：harness 不负责替代攀登者，而是把人或模型连接到绳索、工具和路线约束上，让它能够在特定环境中行动；软件 harness 则为 AI 模型提供指令、工具、循环框架和模型适配层。

## 核心定义

Agent harness 是一套为 AI 模型提供运行环境的软件。文章提出一个简化公式：**Agent = Model + Harness**。模型提供能力，harness 负责把能力放进一个可操作、可扩展、可由用户拥有的环境中。

## 四个组成部分

1. **System Prompt（系统提示）**：规定模型在该 harness 上下文中如何行动。
2. **Tools（工具）**：以代码提供搜索、写代码、发邮件等能力，但通常让模型自行决定何时调用。
3. **Agentic Loop（智能体循环）**：让模型根据观察结果反复理解请求、调用工具、检查结果并继续行动。
4. **Translation Layer（翻译层）**：把 harness 接到不同供应商或开放权重模型，必要时允许同一循环切换模型。

## 文章主张

- 终端用户可以拥有并改造 harness，而不必拥有模型权重。
- 本地、免费、开源且中立的 harness 可以把模型选择、会话保存和工具扩展的控制权交还给用户。
- 界面可以是 Terminal、聊天应用、iMessage 或电子邮件；harness 的核心不由 UI 形式决定。
- harness 与 [[Agent Loop]]、[[Cloud Agent Runtime]] 相连：前者提供循环和能力边界，后者还需要额外处理凭证、持久状态、策略和审计。

## 相关页面

- [[Agent Harness]] — 可复用的概念解释
- [[Agent Loop]]
- [[Model Translation Layer]]
- [[System Prompt]]
- [[Pi]]
- [[What Is Reasoning]] — reasoning channel 与模型输出路由的案例
