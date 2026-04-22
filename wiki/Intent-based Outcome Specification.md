---
type: concept
created: 2026-04-22
updated: 2026-04-22
tags:
  - AI
  - UX
  - interaction
source_count: 1
---

# Intent-based Outcome Specification

基于意图的结果规范（Intent-based Outcome Specification）是一种 AI 交互范式：用户说明自己想达成什么、有哪些约束、系统被允许做到哪一步，系统再自行规划和执行过程。

## 一个可用意图的三部分

- **Desired Outcome（期望结果）**：用户真正想获得什么结果
- **Constraints（约束条件）**：预算、时间、风险、风格、政策等边界
- **Delegation Boundary（委派边界）**：系统可以直接执行哪些动作，哪些动作只允许准备方案

只有这三部分同时明确，系统才能把一句自然语言请求稳定地映射成可执行计划。

## 用户角色如何变化

在命令式界面里，人负责内部规划，再通过菜单、按钮和表单逐步执行。

在基于意图的系统里，人把部分规划外化给机器。系统需要解释目标、选择子目标、安排动作、申请权限并处理异常，因此用户角色从操作员（operator）转为监督者（supervisor）。

## 可用性指标如何改写

- **Intent Capture（意图捕获）**：系统是否正确理解目标、约束和优先级
- **Clarification Quality（澄清质量）**：系统是否在关键时刻提出足够小、足够准的澄清问题
- **Ease of Delegation（委派便捷性）**：用户是否能安心把多步骤任务交给系统
- **Evaluability（可评估性）**：用户是否能快速判断输出是否真正满足目标
- **Trust Calibration（信任校准）**：用户是否能形成与系统能力相匹配的信任水平

## 对界面的直接要求

基于意图的结果规范会直接推高三类设计需求：

- 需要解决 [[Articulation Barrier]]，帮助用户把模糊需求逐步表达清楚
- 需要 [[Orchestration Surface]]，把计划、来源、权限和回执变得可检查
- 需要 [[Intentional Cognitive Friction]]，在高风险动作前保留人类判断权

## 相关概念

- [[Articulation Barrier]]
- [[Orchestration Surface]]
- [[Intentional Cognitive Friction]]
- [[Intent by Discovery]]
- [[Intent by Discovery Designing the AI User Experience]]
