---
type: entity
created: 2026-04-09
updated: 2026-04-09
tags:
  - entity
  - company
source_count: 1
---

# Manus

Manus 是一个 AI 智能体项目，后来被 **Meta** 收购。他们的经验总结文章 "Context Engineering for AI Agents: Lessons from Building Manus" 提供了构建生产级 AI 智能体时的上下文工程最佳实践。

## 核心贡献

Manus 选择了基于上下文工程而非端到端训练的道路，原因：
- 改进可在 **数小时内** 发布，而非数周
- 产品与底层模型解耦（"船 vs 海底的柱子"）

## 六个关键原则

1. **Design Around the KV-Cache** — 围绕 KV-Cache 设计，保持提示前缀稳定，上下文仅追加，关注 KV-Cache 命中率（直接影响延迟和成本）
2. **Mask, Don't Remove** — 使用上下文感知的状态机管理工具可用性，通过词元屏蔽（token masking）而非动态增删工具
3. **Use the File System as Context** — 将文件系统视为终极上下文，容量无限、持久，作为结构化外部内存
4. **Manipulate Attention Through Recitation** — 通过重复读写（如 todo.md）将目标保持在上下文末尾，避免 "lost-in-the-middle"
5. **Keep the Wrong Stuff In** — 保留错误痕迹在上下文中，让模型能自适应、不重复犯错
6. **Don't Get Few-Shotted** — 在上下文里引入多样性，打破模式依赖

## 相关概念

- [[KV-Cache]] — 键值缓存对 AI 智能体性能至关重要
- [[Context Engineering]] — 上下文工程的实际应用
- [[Agent Loop]]
- [[State Machine for Agents]]
- [[Masking Tool Logits]]
- [[File System as Context]]
- [[Recitation for Attention Manipulation]]
- [[Keep Errors in Context]]
- [[Few-Shot Prompting in Agents]]
- [[Stochastic Graduate Descent]]

## 参考文献

- [Context Engineering for AI Agents: Lessons from Building Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) (2025-07-18)
- Manus 现已加入 Meta
