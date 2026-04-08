---
type: concept
created: 2026-04-08
updated: 2026-04-08
tags:
  - LLM
  - wiki
  - knowledge
source_count: 1
---

# LLM Wiki Pattern

LLM Wiki 模式是一种由 LLM 逐步构建并维护的持久化知识库架构。

## 核心思想

传统 RAG 每次查询都从原始文档中重新提取片段——没有知识积累。LLM Wiki 模式不同：LLM **持续构建和维护一个结构化的、相互链接的 Markdown 页面集合**，位于用户和原始源之间。

- 新源加入时，LLM 不只是索引它，而是读取、提取、整合到现有 wiki 中
- 知识编译一次，然后**保持最新**，而非每次查询时重新推导

## 三层架构

1. **Raw Sources** — 不变的原始文档集合（文章、论文、图像、数据文件），只读
2. **The Wiki** — LLM 生成的 Markdown 文件目录（摘要、实体页、概念页、对比、综述），LLM 全权负责
3. **The Schema** — AGENTS.md 等约定文件，告诉 LLM wiki 的结构、规范和工作流程

## 三个工作流

- **Ingest（录入）** — 添加新源，LLM 读取、提取要点、创建/更新 wiki 页面、更新索引、追加日志
- **Query（查询）** — 针对 wiki 提问，LLM 搜索相关页面、综合带引用的答案，好的答案可归档为新 wiki 页面
- **Lint（检查）** — 定期检查 wiki 健康：矛盾、过时内容、孤立页面、缺失的页面或交叉引用

## 为什么有效

维护知识库最繁琐的部分是记录工作：更新交叉引用、保持摘要最新、标记矛盾、维持一致性。人类的维护负担增长速度超过价值增长，所以最终放弃 wiki。LLM 不会厌倦、不会忘记更新交叉引用、一次可以修改 15 个文件。

## 类比

Obsidian 是 IDE，LLM 是程序员，wiki 是代码库。

## 相关概念

- [[Retrieval-Augmented Generation (RAG)]] — LLM Wiki 是 RAG 的进化
- [[Long-term Memory for LLMs]] — wiki 本质上就是一个长期记忆系统
- [[Scratchpads]] — wiki 本身也可以视为一种外部草稿区
