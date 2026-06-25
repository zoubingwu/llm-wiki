---
type: concept
created: 2026-04-22
updated: 2026-06-22
tags:
  - AI
  - UX
  - agent
source_count: 2
---

# Orchestration Surface

编排界面（Orchestration Surface）是意图式 AI 系统中的中间层：它位于用户表达结果和系统实际执行之间，负责把计划、来源、权限和回执变成可检查的界面。

## 它解决什么问题

在传统 GUI 中，用户亲手完成每一步，因此天然知道发生了什么。

在 agent 系统里，执行过程发生在屏幕外。编排界面的工作，就是把这种“隐含知识”重新制造成可读性（legibility）。

## 核心职责

- 展示系统理解到的目标和下一步计划
- 展示数据来源与证据链
- 管理权限请求和批准顺序
- 在动作完成后生成明确回执，说明改了什么、触达了哪些系统、还有哪些部分可撤回
- 通过反事实解释帮助用户理解系统为何选择方案 A 而非方案 B

## 为什么预览还不够

预览只回答“准备做什么”。

成熟的编排界面还要回答“实际上做了什么”“基于什么假设”“哪里还可以介入”。这直接关系到执行透明度（Execution Transparency）和信任校准（Trust Calibration）。

## 协作意图

在组织环境里，意图很少只是个人偏好。它通常还受到共享预算、共享系统、审批规则和他人责任的约束。

因此编排界面还要能处理协作意图（Collaborative Intent）：识别来自多个人类利益相关者或多个专业智能体的冲突指令，并在执行前把冲突暴露出来。

## 运行时对应层

[[Dumb Sandbox, Smart Host]] 给编排界面补上了系统侧对应层：用户能看到的权限请求、执行回执和事后解释，需要由 [[Agent Host Control Plane]] 记录的边界跨越来支撑。

当 [[Agent Sandbox]] 通过 [[Agent Tool Bridge]] 调用认证服务、写入工件、消耗 credit 或触发重试时，主机侧记录会成为回执和审计的事实来源。这样编排界面可以说明一次运行触达了哪些系统、使用了哪些凭证、产生了哪些状态变化，以及哪些部分仍可恢复或撤销。

## 相关概念

- [[Intent-based Outcome Specification]]
- [[Intentional Cognitive Friction]]
- [[Slow AI]]
- [[Multi-agent System]]
- [[Intent by Discovery Designing the AI User Experience]]
- [[Smart Host Dumb Sandbox]]
- [[Agent Experience Design (AX)]] — AX 处理智能体-房间之间的信号界面，编排界面处理人-智能体之间的意图协商
