---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - AI
  - agent
  - tools
  - security
source_count: 1
---

# Agent Tool Bridge

智能体工具桥接层（Agent Tool Bridge）是 [[Agent Sandbox]] 跨回产品、认证服务、内部 API 或 LLM 网关时经过的狭窄接口。它让沙盒可以请求能力，由 [[Agent Host Control Plane]] 做授权、凭证附加、记录和裁决。

## 基本流程

1. 沙盒发出结构化请求，例如调用 Slack、写入工件、发起 LLM 调用或访问内部 API。
2. 主机验证请求属于当前运行，并检查策略、额度和用户授权。
3. 主机在服务端附加真实凭证或换取短期凭证。
4. 主机转发调用，记录边界跨越、响应、失败和账务影响。
5. 沙盒只收到必要响应。

## 接口形态

这种桥接层通常看起来很普通：stdout markers、bridge calls、作用域 token、过期凭证、结构化事件和工件路径。它的价值在于可审计、可重放，并能在沙盒被攻陷时推理泄露范围。

## 安全边界

桥接层避免把 OAuth token、provider key、数据库凭证和内部服务密钥放进沙盒。沙盒需要外部能力时，使用 [[Scoped Credentials for Agents]] 或由主机代为附加凭证。

## 相关概念

- [[Dumb Sandbox, Smart Host]]
- [[Smart Host Dumb Sandbox]]
- [[Cloud Agent Runtime]]
- [[Agent Sandbox]]
- [[Agent Host Control Plane]]
- [[Orchestration Surface]]
