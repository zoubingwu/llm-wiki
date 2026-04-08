---
type: overview
created: 2026-04-08
updated: 2026-04-08
tags:
  - overview
source_count: 2
---

# Overview

个人知识库的主题总览。目前涵盖两个核心主题：**上下文工程**（Context Engineering）和 **LLM Wiki 模式**。

## Context Engineering（上下文工程）

研究 LLM 如何接收、处理和利用输入信息，以及如何通过结构化管理上下文窗口来提升模型输出质量。

核心发现：输入更多信息反而可能降低模型表现（[[Context Rot]] 问题），需要通过 [[Context Engineering]] 的四种策略（Write、Select、Compress、Isolate）来优化。

涉及：[[Attention Mechanism]]、[[Context Window]]、[[Retrieval-Augmented Generation (RAG)]]、[[Lost in the Middle Problem]] 等。

## LLM Wiki 模式

一种由 LLM 逐步构建和维护的持久化知识库架构。核心理念是 **知识编译一次、持续更新**，而非每次查询时重新从原始文档中提取。

人负责：提供源资料、提出问题、审查结果。LLM 负责：总结、交叉引用、归档、维护一致性。

涉及：[[Scratchpads]]、[[Long-term Memory for LLMs]]、Obsidian 工具链（Web Clipper、Dataview、Marp）。
