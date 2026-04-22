---
type: concept
created: 2026-04-22
updated: 2026-04-22
tags:
  - AI
  - UX
  - safety
source_count: 1
---

# Intentional Cognitive Friction

有意认知摩擦（Intentional Cognitive Friction）是指在高风险 AI 动作前，界面刻意加入足够的停顿、解释和确认步骤，让用户把认知注意力放到真正需要判断的地方。

## 为什么需要

生成式 AI 容易制造流畅、权威、即时的表象。这样的界面会放大自动化偏见（Automation Bias）和可信度陷阱（Plausibility Trap），让用户更容易跳过核查。

有意认知摩擦的作用，是把用户从“顺手批准”重新拉回到“带着判断批准”。

## 典型做法

- **Progressive Delegation（渐进式委派）**：先起草，再准备，再执行低风险动作，最后才触达高风险系统
- **Granular Authorization（细粒度授权）**：把批准粒度细化到动作、对象或金额阈值
- **Artificial Delay（人工延时）**：在关键动作前加入短暂倒计时或确认窗口
- **Provenance Highlighting（来源高亮）**：把证据链和关键假设直接暴露给用户
- **Epistemic UI（认识论界面）**：用不确定性可视化引导用户把注意力集中到薄弱环节

## 摩擦应该如何分配

有效的摩擦来自风险校准，而不是统一加慢。

它通常取决于四个因素：

- 动作是否可逆
- 影响范围是否外部可见
- 用户角色拥有多大授权
- 组织或场景的风险容忍度有多高

## 相关概念

- [[Orchestration Surface]]
- [[Slow AI]]
- [[Intent-based Outcome Specification]]
- [[Intent by Discovery Designing the AI User Experience]]
