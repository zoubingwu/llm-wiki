---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - AI
  - agent
  - sandbox
  - security
source_count: 1
---

# Agent Sandbox

智能体沙盒（Agent Sandbox）是云智能体运行时中的可丢弃执行边界。它运行模型选择的代码、shell 命令、辅助脚本和本地工具，并把结果通过窄通道交回可信主机。

## 应该具备的能力

沙盒在执行维度上应该足够强：可以运行代码、创建临时文件、调用本地工具、使用 MCP server，并在需要时发起 LLM 调用请求。

这些能力服务于 [[Agent Loop]] 中的“执行动作 -> 观察结果”阶段。沙盒提供环境反馈，模型再根据观察结果继续规划下一步。

## 应该隔离的能力

在 [[Smart Host Dumb Sandbox]] 模式中，沙盒不持有长期凭证，不直接写业务数据库，不决定计费，不直接调用内部服务，也不成为系统记录的唯一来源。

长期身份、密钥、计费、持久化、策略和可观察性由 [[Agent Host Control Plane]] 掌管。沙盒需要跨回产品或认证服务时，通过 [[Agent Tool Bridge]] 发送请求。

## 失败模型

智能体沙盒的设计目标是可替换。沙盒崩溃时，临时文件和进行中的执行可能丢失；用户身份、计费状态、持久事件日志、重试能力和解释能力应留在主机侧。

提示注入诱导环境导出时，泄露面应受 [[Scoped Credentials for Agents]] 控制，限制在单次运行、特定环境、特定能力和短时间窗口内。

## 相关概念

- [[Dumb Sandbox, Smart Host]]
- [[Cloud Agent Runtime]]
- [[Agent Host Control Plane]]
- [[Agent Tool Bridge]]
- [[File System as Context]]
