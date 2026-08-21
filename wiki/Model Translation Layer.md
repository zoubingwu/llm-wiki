---
type: concept
created: 2026-08-21
updated: 2026-08-21
tags:
  - concept
  - agent
  - model-serving
  - interoperability
source_count: 1
---

# Model Translation Layer

Model Translation Layer（模型翻译层）是 agent harness 中连接统一 agent 能力与多个 AI 模型接口的适配层。它把不同供应商、协议和模型格式的差异隔离在 harness 边界内，让上层循环不必为每个模型重写一套工具调用、消息格式和响应处理逻辑。

## 作用

- 把 harness 的请求和能力描述适配为目标模型所需的接口格式。
- 将目标模型返回的文本、tool call 等结果转换回 harness 能处理的形式；具体兼容范围取决于实现。
- 允许同一个 [[Agent Loop]] 在不同任务阶段切换模型，因为不同模型可能擅长不同任务。
- 让用户选择 Anthropic、OpenAI 或开放权重模型，而不必把会话和工具绑定在某一家 AI 实验室的应用中。

## 自主权与边界

翻译层降低了供应商锁定，但不等于所有模型能力完全相同。上下文长度、工具协议、推理格式、速率限制、成本和安全策略仍可能不同，harness 需要在适配时保留这些差异或明确降级行为。

它也不应被理解为云端安全边界：凭证、计费、持久状态和审计仍需要由适当的 [[Agent Host Control Plane]] 或其他可信组件管理。

## 相关页面

- [[Agent Harness]]
- [[What is a Harness]]
- [[Agent Loop]]
- [[AI Inference Engineering]]
- [[Reasoning Traces]]
- [[Scoped Credentials for Agents]]
