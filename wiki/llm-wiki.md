---
type: source
created: 2026-04-22
updated: 2026-04-22
tags:
  - source
  - wiki
  - LLM
source_count: 1
---

# llm-wiki

这份 gist 是 [[LLM Wiki Pattern]] 在当前仓库中的原始模式来源。它定义了一个由 LLM 持续维护、以 Markdown 为核心载体的个人知识库工作流。

源文见：[llm-wiki](../articles/llm-wiki.md)。

## 核心贡献

- 提出“raw sources / wiki / schema”三层架构
- 明确 ingest、query、lint 三个长期工作流
- 把 wiki 定义为持续累积、持续修订的知识编译产物
- 强调人负责选源、探索和提问，LLM 负责总结、交叉引用、归档和维护
- 将 Obsidian、LLM 与 wiki 的关系概括为 “IDE / programmer / codebase”

## 在当前仓库中的角色

这份文档是本仓库工作方式的概念源之一。当前的 `AGENTS.md` 和 `.agents/skills/wiki-ingest` 实际上就是对这个模式的仓库化实现。

## 关联页面

- [[LLM Wiki Pattern]]
- [[Overview]]
- [[Long-term Memory for LLMs]]
- [[Retrieval-Augmented Generation (RAG)]]
