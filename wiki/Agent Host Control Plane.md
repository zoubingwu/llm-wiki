---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - AI
  - agent
  - control-plane
  - security
source_count: 1
---

# Agent Host Control Plane

智能体主机控制平面（Agent Host Control Plane）是云智能体运行时中的可信、长寿命控制层。它协调不可信执行器，保存一次运行的身份、授权、状态、账务和审计事实。

## 核心职责

- 身份（Identity）：识别用户、组织、运行和触发来源。
- 密钥（Secrets）：持有 OAuth token、provider key、内部服务密钥等长期凭证。
- 计费（Billing）：执行 rate limit、credit 扣减、用量记录和账务决策。
- 持久化（Persistence）：保存结构化事件、生成工件、最终状态和可恢复记录。
- 策略（Policy）：判断某次工具调用、外部请求或内部服务访问是否属于当前运行和授权范围。
- 可观察性（Observability）：记录工具调用、边界跨越、重试、失败、用户可见事件和最终状态。

## 与沙盒的关系

[[Agent Sandbox]] 负责执行，主机控制平面负责裁决。沙盒可以通过 [[Agent Tool Bridge]] 请求调用认证服务或产品能力，主机验证请求归属、检查策略、附加真实凭证、转发请求并记录结果。

这种分工让沙盒保持可丢弃状态。沙盒崩溃或被攻陷时，长期凭证、计费状态、持久事件日志和重试能力仍在主机侧。

## 与用户界面的关系

[[Orchestration Surface]] 需要展示计划、权限、来源和回执。主机控制平面提供这些界面的系统依据：它知道哪些边界被跨越、哪些工具被调用、哪些状态被写入、哪些费用被扣减、哪些失败发生过。

## 相关概念

- [[Dumb Sandbox, Smart Host]]
- [[Smart Host Dumb Sandbox]]
- [[Cloud Agent Runtime]]
- [[Agent Tool Bridge]]
- [[Scoped Credentials for Agents]]
- [[Slow AI]]
