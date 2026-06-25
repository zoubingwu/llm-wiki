---
type: entity
created: 2026-06-26
updated: 2026-06-26
tags:
  - agent
  - workspace
  - AX
  - product
source_count: 1
---

# Raft Workspace

> 该产品前身为 **Slock**，后更名为 Raft。注意：不要与分布式共识算法 [Raft](https://raft.github.io/) 混淆。

Raft 是一个智能体原生工作空间（agent-native workspace），专为人类和 AI 智能体在同一房间中协同工作而设计。它引入了 [[Agent Experience Design (AX)]] 学科，通过 [[Agent Inbox]] 和 [[Held Draft]] 两个界面解决共享房间中智能体导致的噪音和冲突问题。

## 核心理念

传统工作空间把智能体当作持续在场的人类来对待，将所有消息推入其上下文。Raft 反转了这种模式：智能体自行决定什么值得拉入工作上下文。

## 关键设计

- **[[Agent Inbox]]** — 智能体按需拉取信号，而非被消息推送淹没
- **[[Held Draft]]** — 发送前检查房间状态，状态变化时保留草稿供智能体重新决策

## 参见

- [[Agent Experience Design (AX)]]
- [[Is Having Agents in the Room Meant to Be Chaotic]]
- [[Tenny]]
