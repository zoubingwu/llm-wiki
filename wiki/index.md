# Wiki Index

## 概念概念
- [[Context Engineering]] — 设计和管理 LLM 上下文窗口的四种策略（Write、Select、Compress、Isolate）
- [[Context Rot]] — 输入长度增加导致 LLM 性能断崖式下降
- [[Attention Mechanism]] — 注意力机制的工作原理、计算代价和注意力分配不均
- [[Context Window]] — 模型单次交互能看到的 token 总数，有效长度远小于营销值
- [[Lost in the Middle Problem]] — LLM 对输入中间部分关注度不足的现象
- [[Retrieval-Augmented Generation (RAG)]] — 检索增强生成，只拉取相关信息注入上下文
- [[Scratchpads]] — agent 长任务中保存中间步骤到外部存储
- [[Long-term Memory for LLMs]] — LLM 跨会话持久化信息
- [[Multi-agent System]] — 将任务分配给多个专业化 agent，各自有干净的上下文
- [[LLM Wiki Pattern]] — 由 LLM 构建和维护的持久化知识库，知识编译一次后持续更新
- [[KV-Cache]] — 键值缓存对 AI Agent 性能至关重要，直接影响延迟和成本
- [[Agent Loop]] — AI Agent 的标准循环流程，上下文增长与输出失衡
- [[State Machine for Agents]] — 用状态机管理工具可用性，通过 token masking 保持上下文稳定
- [[Recitation for Attention Manipulation]] — 通过重复读写（todo.md）将目标保持在上下文末尾，避免迷失在中间
- [[File System as Context]] — 将文件系统视为终极上下文，作为无限、持久的外部内存
- [[Keep Errors in Context]] — 保留错误痕迹让模型自适应更新
- [[Few-Shot Prompting in Agents]] — 少样本提示在 Agent 系统中的陷阱
- [[Stochastic Graduate Descent]] — 随机研究生下降法，Manus 团队的实验迭代方法论

## 实体
- [[ByteByteGo]] — 技术博客，发布了 Context Engineering 指南
- [[Karpathy]] — Andrej Karpathy，提出 context engineering 概念
- [[Chroma]] — AI 公司，2025 年 Context Rot 研究的发布者
- [[Anthropic]] — AI 公司，多 agent 研究系统的开发方
- [[Cognition]] — Devin 编码 agent 的开发商
- [[Manus]] — AI agent 项目，被 Meta 收购，提供了上下文工程实战经验

## 源摘要
- [[A Guide to Context Engineering for LLMs]] — ByteByteGo 关于上下文工程的全面指南（2025-12-16）
  - [[llm-wiki]] — karpathy 关于 LLM Wiki 模式的原始概念文件（2026-04-04）
  - [[Context Engineering for AI Agents Lessons from Building Manus]] — Manus 团队的实战经验（2025-07-18）

## 分析 / 对比
（暂无，后续 query 中产生的分析将归档于此）
