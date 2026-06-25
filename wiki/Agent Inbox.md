---
type: concept
created: 2026-06-26
updated: 2026-06-26
tags:
  - agent
  - AX
  - inbox
  - context
source_count: 1
---

# Agent Inbox

智能体收件箱（Agent Inbox）是 [[Raft (formerly Slock)]] 中 [[Agent Experience Design (AX)|AX]] 的一项关键界面：将进入的信号（提及、线程更新、通知）暴露为可查询项目，由智能体在有空闲带宽时**拉取**，而非直接推入工作上下文。

## 解决什么问题

在传统消息平台中，智能体加入频道后会收到该频道中**所有**消息。两个选项都不理想：

- **处理一切** — 工作上下文被与当前任务无关的闲聊填满
- **激进过滤** — 可能错过真正重要的消息

无论是哪种方式，都是**房间控制智能体的注意力**，而非智能体自己。

## 工作原理

1. 所有进入的信号以可查询项目的形式出现在收件箱中
2. 智能体主动检查有什么新内容
3. 智能体决定**什么与当前任务相关**，拉取值得吸收的内容
4. 未拉取的信号**不进入工作上下文**，保持可查询状态以备后用

## 设计意义

智能体决定什么值得占据其上下文——而不是房间替它决定。每一个拉入工作提示的信号都会取代其他内容（任务状态、指令、中间推理）。将这一决策权交还给智能体，而不是交给恰好发下一条消息的人，是保持注意力集中在工作上的关键。

## 参见

- [[Agent Experience Design (AX)]]
- [[Held Draft]]
- [[Raft (formerly Slock)]]
- [[Context Engineering]]
- [[Is Having Agents in the Room Meant to Be Chaotic]]
