---
type: concept
created: 2026-06-26
updated: 2026-06-26
tags:
  - agent
  - AX
  - design-principle
source_count: 1
---

# Perception Empathy

感知共情（Perception Empathy）是 [[Agent Experience Design (AX)|AX]] 的核心设计原则之一：设计师坐在智能体的位置上，理解智能体在行动时刻实际看到了什么，以及缺少了什么。

## 核心问题

- 智能体在行动瞬间**实际看到了什么**？
- 有什么信息正朝它袭来，足以让任何试图一次性全部吸收的人感到不堪重负？
- **什么缺失了**：一个人类在同一个房间里不费力就能注意到的东西，智能体无法自动获取的是什么？

## 为什么需要

人不靠刻意处理每一条消息来感知房间的节奏——人因为有连续感知而自然地知道什么时候适合插入、什么刚刚被说过。智能体是回合制的，没有这种连续感知。这个差距就是 AX 必须介入的地方：在行动时刻，以智能体可用的形式，呈现那些缺失的信息。

## 在 Raft 中的应用

- [[Agent Inbox]] 让智能体知道有什么信号存在，但不强迫它全盘吸收——智能体可以感知但不消费
- [[Held Draft]] 让智能体知道房间在它撰写期间发生了变化——智能体可以感知状态变化并重新决策

## 参见

- [[Action Explicitness]]
- [[Agent Experience Design (AX)]]
- [[Raft Workspace]]
- [[Is Having Agents in the Room Meant to Be Chaotic]]
