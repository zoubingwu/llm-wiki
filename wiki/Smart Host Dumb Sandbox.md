---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - AI
  - agent
  - runtime
  - security
source_count: 1
---

# Smart Host Dumb Sandbox

智能主机、简单沙盒（Smart Host, Dumb Sandbox）是一种 [[Cloud Agent Runtime]] 架构原则：把身份、密钥、计费、持久化、策略和可观察性放在可信主机里，把模型选择的代码执行放进可丢弃的沙盒里。

## 核心分工

[[Agent Host Control Plane]] 是可信、长寿命的控制平面，负责用户身份、长期凭证、业务状态、计费决策、重试、策略检查和系统记录。

[[Agent Sandbox]] 是不可信执行边界，负责运行模型生成或选择的代码、shell 命令、辅助脚本和本地工具。它可以产生文件和结构化事件，再交给主机判断如何保存或转发。

[[Agent Tool Bridge]] 是两者之间的窄通道。沙盒发起请求，主机检查当前运行、策略和授权，再在服务端附加真实凭证并记录边界跨越。

## 设计测试

这个模式用失败场景校验架构边界：

- 提示注入（Prompt Injection）诱导智能体导出环境时，攻击者只能拿到单次运行、短时间窗口和特定作用域内的凭证。
- 沙盒崩溃时，临时文件和进行中执行可能丢失，用户身份、计费状态、持久事件日志、重试能力和解释能力仍由主机保留。
- 新功能需要密钥、持久状态、授权判断或内部服务调用时，应归入主机或桥接层；模型选择代码执行才归入沙盒。

## 为什么重要

云智能体可能在共享基础设施上无人值守运行，也可能由定时任务、API 或其他智能体触发。此时沙盒内代码来自 LLM 输出，提示词可能带有对抗性，执行环境也可能已经被攻陷。

智能主机、简单沙盒模式让高权限能力远离可攻陷执行环境，降低 [[Agent Loop]] 中工具调用和代码执行的 blast radius，并为 [[Slow AI]] 的重试、恢复、回执和审计提供系统基础。

## 相关概念

- [[Dumb Sandbox, Smart Host]]
- [[Cloud Agent Runtime]]
- [[Agent Host Control Plane]]
- [[Agent Sandbox]]
- [[Agent Tool Bridge]]
- [[Scoped Credentials for Agents]]
- [[Orchestration Surface]]
