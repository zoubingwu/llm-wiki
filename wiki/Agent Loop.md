---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 智能体
  - loop
  - context
source_count: 1
---

# Agent Loop

Agent Loop 指 AI 智能体执行任务的标准循环：接收输入 -> 选择动作 -> 执行 -> 观察 -> 更新上下文 -> 重复。

## 典型流程

1. **接收用户输入**
2. **基于当前上下文选择动作**（从预定义的动作空间）
3. **在环境中执行动作**（如虚拟机沙箱）
4. **产生观察结果**
5. **将动作和观察结果追加到上下文**
6. **形成下一次迭代的输入**
7. **循环直到任务完成**

## 挑战

- 上下文随每个步骤**增长**（Manus 平均需要 50 次工具调用）
- 输出（函数调用）相对较短
- 导致**输入/输出词元比例严重失衡**（Manus 约 100:1）

## 优化考虑

- [[KV-Cache]] 命中率对成本和延迟至关重要
- 长循环易导致**目标漂移**（"drift off-topic"）
- 需通过[[Recitation for Attention Manipulation]] 保持目标可见
- [[Multi-agent System]] 有时能分解长循环为短循环

## 参见

- [[Manus]]
- [[State Machine for Agents]]
