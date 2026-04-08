---
type: concept
created: 2026-04-08
updated: 2026-04-08
tags:
  - LLM
  - context
  - transformer
source_count: 1
---

# Context Window

上下文窗口（Context Window）是模型在单次交互中一次能看到的词元总数。

## 上下文窗口包含什么

所有必须放进窗口的东西：

- System Instructions（系统指令）
- Conversation History（对话历史）
- Retrieved Knowledge（外部注入的文档或数据）
- Tool Descriptions（工具描述）
- Tool Outputs（工具调用结果）
- User Input（用户的实际问题）

## 现代模型规模

现代模型宣称的上下文窗口从 128,000 到超过 200 万词元不等。但**越大不直接等于更好**。

## 有效上下文长度

**营销窗口 ≠ 有效窗口。** 

- 模型能通过百万级词元的 "大海捞针" 测试（在长文档中找一个预设句子）
- 但可靠地综合数百页散落的信息是完全不同的能力
- 实际能有效利用的上下文长度通常比宣称值小得多

参见 [[Attention Mechanism]]（注意力不均）和 [[Context Rot]]（性能断崖式下降）。
