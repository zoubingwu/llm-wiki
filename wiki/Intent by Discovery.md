---
type: concept
created: 2026-04-22
updated: 2026-04-22
tags:
  - AI
  - UX
  - discovery
source_count: 1
---

# Intent by Discovery

通过发现形成意图（Intent by Discovery）是一种更长期的 AI UX 方向：用户未必一开始就知道自己想要什么，系统通过展示候选方案、允许比较和持续提问，帮助用户在探索过程中逐步形成清晰意图。

## 为什么它重要

人在很多场景里更擅长识别，而不是凭空描述。

这意味着 AI 交互会从“先写清楚再生成”逐步转向“先探索可能性，再锁定目标”。用户的主要需求也会从生产转向发现。

## 典型设计模式

- **Spatial Navigation of Latent Space（潜在空间的空间导航）**：在连续候选空间中拖动、比较和定位
- **Direct Object Manipulation（直接对象操作）**：通过直接修改生成结果来反向暴露真实偏好
- **Socratic Scaffolding（苏格拉底式支架）**：系统主动追问关键约束，帮助用户逐步澄清目标
- **Generative UI（生成式 UI）**：界面随当前探索上下文动态生成专用控件
- **Curation as Intent（策展即意图）**：通过收集图片、语音、文档、参考样式来表达偏好
- **Subtractive Sculpting（减法式雕刻）**：先生成一个足够丰富的版本，再通过删除和收缩逼近目标

## 与 Prompt Augmentation 的关系

提示增强（Prompt Augmentation）适合当前阶段，它帮助用户把已有意图写得更清楚。

Intent by Discovery 更进一步，它承认很多意图本来就是在探索中形成的，因此交互重点会从写提示转向导航候选空间。

## 相关概念

- [[Articulation Barrier]]
- [[Intent-based Outcome Specification]]
- [[Orchestration Surface]]
- [[Intent by Discovery Designing the AI User Experience]]
