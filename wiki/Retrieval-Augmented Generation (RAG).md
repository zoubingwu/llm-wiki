---
type: concept
created: 2026-04-08
updated: 2026-04-08
tags:
  - LLM
  - RAG
  - retrieval
source_count: 2
---

# Retrieval-Augmented Generation (RAG)

检索增强生成（Retrieval-Augmented Generation，RAG）是一种将外部知识检索与 LLM 生成能力结合的技术。

## 核心思想

不是把所有知识塞进上下文窗口，而是将知识存储在外部可搜索的数据库中。查询时只检索与当前问题最相关的信息块，注入到上下文中，给模型提供针对性的知识而非全部噪音。

## 在 Context Engineering 中的位置

RAG 属于 [[Context Engineering]] 的 **Select（选择）** 策略。

## 关键权衡：精度 vs 噪音

- 如果检索到的文档不完全相关，它们会变成**干扰项**
- 干扰项消耗词元空间，将重要信息推到低注意力区域
- 检索系统本身必须经过良好设计，否则 RAG 适得其反

## 与 LLM Wiki 模式的关系

[[LLM Wiki Pattern]] 本质上是对 RAG 的改进：

- 传统 RAG：每次查询都从原始文档中重新提取片段，没有知识积累
- LLM Wiki：LLM 逐步构建并维护一个持久化的 wiki，知识编译一次后持续更新
- 在中等规模（约 100 个源、数百个页面）下，用 index.md 文件就能取代 embedding-based RAG

## 工具

- [[qmd]] — 本地 Markdown 搜索引擎，混合 BM25/vector 搜索 + LLM re-ranking
