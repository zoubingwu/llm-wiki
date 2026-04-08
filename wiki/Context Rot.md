---
type: concept
created: 2026-04-08
updated: 2026-04-08
tags:
  - LLM
  - context
source_count: 1
---

# Context Rot

上下文腐化（Context Rot）是指随着 LLM 输入长度的增加、模型性能下降的现象——即使任务本身很简单。

## 发现

[[Chroma]] 研究团队在 2025 年测试了 18 个前沿模型（包括 GPT-4.1、Claude、Gemini），发现：

- 性能下降并非渐进式的
- 模型在某个上下文长度前可以保持近乎完美的准确率，之后**急剧下降**
- 下降幅度和临界点因模型和任务而异，无法可靠预测

## 原因

每个添加到上下文窗口的词元都占用有限的注意力预算。

- 无关信息会将重要信息淹没在低注意力区域
- 听起来相关但实际无用的内容混淆模型的相关性判断
- 模型并不会因为输入更多而变得更聪明，反而会分心

## 实际含义

"营销宣传的上下文窗口大小" ≠ "有效上下文长度"。模型虽然能通过百万级词元的简单基准测试（如"大海捞针"），但可靠地综合数百页散落的信息是截然不同的能力。

## 缓解策略

参见 [[Context Engineering]] 中的四种策略：[[Scratchpads]] + [[Long-term Memory for LLMs]]、[[Retrieval-Augmented Generation (RAG)]]、压缩、[[Multi-agent System]] 隔离。
