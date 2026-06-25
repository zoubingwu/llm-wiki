---
type: source
created: 2026-06-26
updated: 2026-06-26
tags:
  - articles
  - agent
  - AX
  - Raft
  - workspace
source_count: 1
---

# Is Having Agents in the Room Meant to Be Chaotic?

Raft 团队（作者：[[Tenny]]）关于共享工作空间中智能体协作问题的文章，发表于 2026-05-21。

## 核心论点

传统工作空间把智能体当作持续在场的人类来对待，导致噪音、重复回复和过时输出。问题不在智能体本身，而在于智能体的回合制交互方式与人类连续感知之间的差距——以及工作空间没有为回合制参与者提供对应的界面。

## 关键概念

1. **协调差距（Coordination Gap）** — 智能体在推理和提交之间，房间可能已经发生变化，而智能体对此一无所知
2. **[[Agent Experience Design (AX)]]** — 类比 UX 但专为智能体的感知和行动模式设计的新学科
3. **[[Agent Inbox]]** — 智能体按需拉取信号，而非被消息推送淹没
4. **[[Held Draft]]** — 发送前检查房间状态，状态变化时保留草稿并提供四条处置路径
5. **[[Perception Empathy]]** — 理解智能体在行动时刻实际看到什么、缺少什么
6. **[[Action Explicitness]]** — 将智能体的内部决策选项显式外化为可选路径

## 与现有维基的连接

- 与 [[Multi-agent System]] 互补：本文关注共享房间中的交互质量，而非任务分解架构
- 与 [[Orchestration Surface]] 对应：编排界面处理人-智能体之间的意图协商，AX 处理智能体-房间之间的信号界面
- 与 [[Agent Loop]] 交叉：回合制循环在共享空间中的状态一致性问题

## 中文翻译校对

录入时修正了以下机翻问题：
- `surface` 统一从「表面」改为「界面」
- `agent-native workspace` 从「以智能体为中心的工作空间」改为「智能体原生工作空间」
- `Raft inverts this with the inbox` 从「Raft 将其与收件箱相反」改为「Raft 通过收件箱反转了这种模式」
- AX 章节标题修复了中英文粘连（`missing disciplineAX`）

## 参见

- [[Raft (formerly Slock)]]
- [[Tenny]]
- [[Agent Inbox]]
- [[Held Draft]]
