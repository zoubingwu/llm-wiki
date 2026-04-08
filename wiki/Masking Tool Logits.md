---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - decoding
  - tools
  - control
source_count: 1
---

# Masking Tool Logits

Masking Tool Logits 指在解码阶段直接屏蔽某些工具相关词元的 logits，从而限制模型可选择的动作空间。

## 为什么需要

在智能体系统中，如果简单地动态增删工具定义：

- 会破坏 [[KV-Cache]]
- 会让历史动作与当前上下文中的工具定义不一致

因此，更稳妥的做法往往不是移除工具，而是在生成时限制模型只能选某些工具。

## 在当前 wiki 里的相关性

这是 [[State Machine for Agents]] 的核心实现思路之一。

- 状态机根据当前上下文决定允许哪些动作
- 通过词元屏蔽而非改写工具定义来施加约束
- 能提升动作选择稳定性并减少 schema 错误

## 相关概念

- [[State Machine for Agents]]
- [[KV-Cache]]
- [[Manus]]
