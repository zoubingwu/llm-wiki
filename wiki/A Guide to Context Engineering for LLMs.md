---
type: source
created: 2026-04-22
updated: 2026-04-22
tags:
  - source
  - LLM
  - context
source_count: 1
---

# A Guide to Context Engineering for LLMs

这篇文章是当前 wiki 里关于 [[Context Engineering|上下文工程]] 的总览型来源，重点解释了 LLM 如何处理上下文、为什么更长上下文会带来新的失真，以及开发者常用的四种上下文管理策略。

源文见：[A Guide to Context Engineering for LLMs](../articles/A%20Guide%20to%20Context%20Engineering%20for%20LLMs.md)。

## 核心贡献

- 解释 [[Context Window]]、[[Attention Mechanism]] 和词元预算之间的关系
- 引入 [[Context Rot]] 与 [[Lost in the Middle Problem]] 两个长上下文核心问题
- 将上下文管理归纳为四种策略：Write、Select、Compress、Isolate
- 用 [[Retrieval-Augmented Generation (RAG)]]、[[Scratchpads]]、[[Long-term Memory for LLMs]]、[[Multi-agent System]] 等案例说明这些策略如何落地
- 把上下文工程明确为“信息环境编排”而不是“只写提示词”

## 在当前 wiki 中的位置

这篇文章是 [[Context Engineering]]、[[Overview]] 与多个子概念页的基础综述来源，也是当前知识库里这条知识线的起点之一。

## 关联页面

- [[ByteByteGo]]
- [[Context Engineering]]
- [[Context Rot]]
- [[Context Window]]
- [[Lost in the Middle Problem]]
- [[Retrieval-Augmented Generation (RAG)]]
- [[Scratchpads]]
- [[Long-term Memory for LLMs]]
- [[Multi-agent System]]
