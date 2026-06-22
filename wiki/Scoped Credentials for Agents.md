---
type: concept
created: 2026-06-22
updated: 2026-06-22
tags:
  - AI
  - agent
  - credentials
  - security
source_count: 1
---

# Scoped Credentials for Agents

智能体作用域凭证（Scoped Credentials for Agents）是为单次智能体运行、特定执行环境、特定能力和短时间窗口签发的受限凭证。它用于降低 [[Agent Sandbox]] 被提示注入或执行环境攻陷后造成的泄露范围。

## 解决的问题

云智能体沙盒会执行 LLM 生成或选择的代码。提示词可能带有对抗性，代码也可能尝试读取环境变量、导出密钥或调用外部服务。

如果沙盒持有长期 OAuth token、provider key、数据库凭证或内部服务密钥，一次提示注入就可能变成长期账号或业务系统泄露。

## 设计要点

- **作用域受限**：只允许访问当前运行需要的工具、资源或 API。
- **时间受限**：凭证自动过期，降低泄露后的可用窗口。
- **环境绑定**：凭证只对当前沙盒、运行或会话有效。
- **主机签发**：[[Agent Host Control Plane]] 保存长期密钥，由 [[Agent Tool Bridge]] 或网关发放短期访问能力。
- **可审计**：每次签发和使用都进入主机侧事件记录。

## 常见位置

LLM 调用、MCP server、外部 SaaS 工具、内部 API 和工件写入都可以使用作用域凭证。真实 provider key 和长期用户 OAuth token 仍由主机保存。

## 相关概念

- [[Dumb Sandbox, Smart Host]]
- [[Smart Host Dumb Sandbox]]
- [[Cloud Agent Runtime]]
- [[Agent Tool Bridge]]
- [[Agent Host Control Plane]]
