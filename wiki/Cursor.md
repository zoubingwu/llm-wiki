---
type: entity
created: 2026-06-16
updated: 2026-08-20
tags:
  - entity
  - AI
  - developer-tools
  - git
source_count: 2
---

# Cursor

Cursor 是面向软件开发的 AI 代码编辑器产品。[[A Guide to AI Inference Engineering]] 将 Cursor Composer 2.0 作为开放模型自托管和推理工程投入的案例：代码补全体验依赖亚秒级延迟，产品团队可以围绕这种具体工作负载优化模型服务栈。

## Git 基础设施：Continuity 与 Origin

[[Git at any scale]]（2026-08）介绍了 Cursor 自研的 Git 存储系统 [[Continuity (Cnt)]]：它采用 WAL-first 设计，以 S3 为事实来源，在维持强一致性的同时让只读吞吐随副本数线性扩展，也能让 agent 创建的低流量小仓库不必常驻三个副本。这套技术被产品化为 Git 托管平台 [[Origin]]，定位为通向更高可靠性、性能与规模的迁移出口（off-ramp）。

## 相关概念

- [[AI Inference Engineering]]
- [[LLM Inference Phases]]
- [[Speculative Decoding]]
- [[Model Parallelism for Inference]]
- [[Git at any scale]]
- [[Continuity (Cnt)]]
- [[Spokes]]
- [[Git Repository Hosting]]
- [[Origin]]
