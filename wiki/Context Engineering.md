---
type: concept
created: 2026-04-08
updated: 2026-04-08
tags:
  - LLM
  - context
source_count: 1
---

# Context Engineering

上下文工程（Context Engineering）是设计、组装和管理 LLM 在生成响应之前所看到的全部信息环境的实践。

## 与 Prompt Engineering 的区别

Prompt Engineering 关注"怎么提问"，Context Engineering 关注"模型此刻需要看到什么信息"。前者是指令层的优化，后者是整个信息系统的编排。

## 上下文中包含的内容

一次典型的 LLM 调用中，上下文窗口包含：

- **System Instructions** — 行为规则、角色设定
- **User Input** — 用户的实际问题
- **Conversation History** — 当前会话的短期记忆
- **Retrieved Knowledge** — 从外部拉取的文档、数据库结果、API 响应
- **Tool Descriptions** — 可用工具的定义
- **Tool Outputs** — 之前工具调用的结果

用户的实际问题通常只占总 token 数的很小一部分。

## 四种核心策略

### 1. Write（写入）

将重要信息保存到外部存储，而不是全塞进上下文窗口。

- **Scratchpads** — 长时间任务中保存中间计划、笔记、推理步骤
- **Long-term Memory** — 跨会话持久化信息（如 ChatGPT 的用户偏好记忆、Claude Code 的 CLAUDE.md）

### 2. Select（选择）

只拉取相关信息。最典型的技术是 [[Retrieval-Augmented Generation (RAG)]]。

关键是检索精度——不相关的文档会变成干扰项，消耗 token 并将重要信息推到注意力较低的区域。

### 3. Compress（压缩）

减少上下文体积，保留关键信息。

- **对话摘要** — 如 Claude Code 在上下文 95% 满时自动摘要
- **修剪** — 移除历史记录中旧的消息
- **工具输出压缩** — 精简冗长的搜索结果或代码输出

每次压缩都面临 **压缩 vs 信息丢失** 的权衡。

### 4. Isolate（隔离）

将工作分配给多个专业化[[Multi-agent System]]，每个 agent 有自己干净、专注的上下文。Anthropic 的多 agent 研究系统在研究任务上比单个 agent 提升了 90.2%，完全来自于上下文管理的优化。

## 相关问题

- [[Context Rot]] — 输入增长导致性能下降
- [[Lost in the Middle Problem]] — 注意力分布不均
- [[Context Window]] — 窗口大小与有效上下文长度的差距

## 参考文献

- Karpathy 关于 context engineering 的 [推文](https://x.com/karpathy/status/1937902205765607626)
