---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - AI
  - agent
  - runtime
source_count: 1
---

# Cloud Agent Runtime

云智能体运行时（Cloud Agent Runtime）是承载云端 AI 智能体执行的系统层，负责在共享基础设施上协调用户意图、模型生成代码、工具调用、凭证、状态、计费、重试和可观察性。

## 与桌面智能体的差异

桌面智能体通常把用户、机器、文件系统、凭证、运行时和进程放在同一个边界内。它可以读取本地文件、使用本地环境变量、直接调用 API，并让用户在出错后手动重试。

云智能体运行时面对更复杂的信任环境：用户可能离线，任务可能由 cron、API 或其他智能体触发，提示词可能具有对抗性，执行环境中的代码也可能已经被攻陷。

## 基本组件

- [[Agent Host Control Plane]]：保存身份、密钥、计费、持久状态、重试、策略和系统记录。
- [[Agent Sandbox]]：执行模型选择的代码、shell 命令、辅助脚本和本地工具。
- [[Agent Tool Bridge]]：让沙盒通过可审计通道调用认证服务、内部 API、LLM 网关或产品能力。
- [[Scoped Credentials for Agents]]：把凭证限制到一次运行、特定环境、特定能力和短时间窗口。

## 运行时边界

云智能体运行时的关键设计问题，是哪些能力应该留在可信主机，哪些能力可以进入可丢弃沙盒。[[Smart Host Dumb Sandbox]] 给出的判断准则是：密钥、持久状态、授权、计费、策略和审计属于主机；模型选择代码执行属于沙盒；跨回产品能力通过桥接层完成。

## 相关概念

- [[Dumb Sandbox, Smart Host]]
- [[Agent Loop]]
- [[Slow AI]]
- [[Orchestration Surface]]
- [[Context Engineering]]
