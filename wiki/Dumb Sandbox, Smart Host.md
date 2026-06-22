---
type: source
created: 2026-06-22
updated: 2026-06-22
tags:
  - source
  - AI
  - agent
  - runtime
  - security
source_count: 1
---

# Dumb Sandbox, Smart Host

这篇 X 长文提出 [[Smart Host Dumb Sandbox]] 作为云智能体运行时（Cloud Agent Runtime）的核心架构原则：可信、长寿命的主机负责身份、密钥、计费、持久化、重试、策略和可观察性；可丢弃的沙盒只承担模型选择代码和 shell 命令的执行。

源文见：[Dumb Sandbox, Smart Host](../articles/Dumb%20Sandbox%2C%20Smart%20Host.md)。

## 核心贡献

- 区分桌面智能体和 [[Cloud Agent Runtime]]：桌面智能体把用户、机器、文件系统、凭证和进程放在同一个边界里；云智能体运行在共享基础设施上，用户可能离线，提示词和执行环境也可能带有对抗性。
- 将 [[Agent Host Control Plane]] 定义为可信控制平面，由它掌管身份、密钥、计费、持久状态、重试、策略、可观察性和运行记录。
- 将 [[Agent Sandbox]] 定义为可丢弃的不可信执行边界，它可以运行代码、创建文件、调用本地工具和 MCP server，但不持有长期凭证，也不直接写业务状态。
- 用 [[Agent Tool Bridge]] 描述沙盒跨回产品或认证服务时的狭窄通道：沙盒发起请求，主机验证运行归属、检查策略、服务端附加真实凭证、记录事件并返回结果。
- 强调 [[Scoped Credentials for Agents]]：LLM 调用和外部工具调用应通过带作用域、短生命周期凭证的网关，沙盒不应看到真实 provider key。
- 把失败场景作为设计测试：提示注入诱导环境导出时，泄露面应限制在单次运行、单个环境和短时间窗口；沙盒崩溃时，身份、计费状态、持久事件日志和重试能力仍在主机侧保留。

## 在当前 wiki 中的位置

这篇文章把 [[Agent Loop]] 从“模型选择动作并在环境执行”的抽象流程，推进到运行时信任边界：动作可以在沙盒内发生，身份、授权、计费和长期状态需要留在主机侧。它也补充了 [[Orchestration Surface]] 和 [[Slow AI]] 的系统基础：用户侧的计划、权限和回执，需要由主机侧的事件记录、策略检查和边界跨越日志支撑。

## 关联页面

- [[Smart Host Dumb Sandbox]]
- [[Cloud Agent Runtime]]
- [[Agent Host Control Plane]]
- [[Agent Sandbox]]
- [[Agent Tool Bridge]]
- [[Scoped Credentials for Agents]]
- [[Agent Loop]]
- [[Orchestration Surface]]
- [[Slow AI]]
