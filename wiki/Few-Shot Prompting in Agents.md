---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 智能体
  - prompting
  - context
source_count: 1
---

# Few-Shot Prompting in Agents

少样本提示（Few-Shot Prompting）在智能体系统中的潜在陷阱。

## 问题

LLM 是优秀的模仿者，会模仿上下文中的行为模式。当上下文充满类似的历史动作-观察对时，模型可能**固守该模式**，即使不再最优。

## 后果

- 重复性决策中陷入节奏（如 Manus 审阅 20 份简历时会重复相似动作）
- 导致目标漂移、过度概括、幻觉

## 解决方案

引入**结构化多样性**：
- 不同序列化模板
- 替换措辞
- 顺序/格式的细微噪声

目的：打破模式，调整模型注意力。

## 核心教训

**上下文越单一，智能体越脆弱**。不要让自己被少样本模式困住。

## 相关概念

- [[Agent Loop]]
- [[Context Engineering]]
- [[Manus]]
