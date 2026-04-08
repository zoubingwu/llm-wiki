---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 智能体
  - state
  - tools
source_count: 1
---

# State Machine for Agents

状态机是一种管理 AI 智能体工具可用性的模式，通过屏蔽词元 logits 而非动态增删工具定义。

## 背景

随着 MCP 等可插拔工具流行，工具数量爆炸式增长（用户可能接入数百个工具）。动态增删工具会：
1. 破坏 [[KV-Cache]]（工具定义通常在上下文前端）
2. 导致模型混乱（历史动作引用已移除的工具）

## 解决方案

使用**上下文感知的状态机**进行词元屏蔽（token masking）：

### 实现方式
- 工具名用一致性前缀（`browser_`、`shell_`）
- 用响应预填（response prefill）限制动作空间
- 在给定状态下只允许从某组工具中选择

### 三种模式（以 Hermes 格式为例）
- **Auto** — 可调用也可不调用，仅预填回复前缀
- **Required** — 必须调用某个函数，预填至 `tool_call` 词元
- **Specified** — 必须调用指定子集的函数，预填至函数名开头

## 好处
- 保持上下文稳定
- 不破坏 KV-Cache
- 确保代理循环稳定

## 参见
- [[Manus]]
- [[Agent Loop]]
- [[Masking Tool Logits]]
