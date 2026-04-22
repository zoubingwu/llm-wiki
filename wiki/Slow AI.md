---
type: concept
created: 2026-04-22
updated: 2026-04-22
tags:
  - AI
  - UX
  - agent
source_count: 1
---

# Slow AI

慢速 AI（Slow AI）描述的是一种新的 agent 交互现实：系统完成任务所需的时间从几秒扩展到几分钟、几小时，甚至几天，传统的轮流对话体验因此被打断。

## 为什么它是新问题

短对话里的等待主要是延迟问题。

长时运行任务里的等待会变成控制感问题。用户会担心系统是否跑偏、是否超预算、是否还记得原始目标，以及中途停掉后还能保留多少成果。

## 核心交互模式

- **Run Contract（运行契约）**：提前说明时间窗口、成本上限、完成定义和硬边界
- **Conceptual Breadcrumbs（概念性面包屑）**：持续汇报中间结论，而不只是技术日志
- **Context Reboarding（上下文重新接入）**：用户回来时，用恢复摘要重新装载原始意图和关键决策
- **Tiered Notifications（分层通知）**：把需要立即介入的阻塞、影响质量的决定和任务完成通知分级处理
- **Salvage Value（残值）**：任务中止后明确哪些中间产物仍然可以复用

## 与传统加载反馈的区别

进度条适合短时、线性、步骤已知的任务。

Slow AI 需要的是对中间判断、剩余风险和可回收成果的持续解释，因此它更接近长程项目管理界面，而不是加载动画。

## 相关概念

- [[Orchestration Surface]]
- [[Intentional Cognitive Friction]]
- [[Agent Loop]]
- [[Intent by Discovery Designing the AI User Experience]]
