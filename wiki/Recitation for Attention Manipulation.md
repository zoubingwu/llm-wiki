---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 智能体
  - attention
  - memory
source_count: 1
---

# Recitation for Attention Manipulation

通过背诵（Recitation）操纵注意力的技术，指智能体在长循环中不断重写任务目标（如 todo.md）到上下文末尾，以将全局计划保持在模型的近期注意力范围。

## 场景

- Manus 平均任务需要 50 次工具调用
- 长循环易导致**目标漂移**或遗忘早期目标
- [[Lost in the Middle Problem]] 导致中间信息被忽略

## 做法

- 创建 `todo.md` 文件
- 随着任务进展逐步更新，勾选完成项
- 在每次迭代中 **重复读写** 该文件

## 效果

- 将全局目标**推向上下文末尾**（注意力高的位置）
- 避免 "lost-in-the-middle" 问题
- 减少目标不一致性
- 不需要修改模型架构

## 机制本质

用自然语言引导模型聚焦任务目标。本质上是一种**无架构修改的注意力偏向**。

## 相关概念

- [[Lost in the Middle Problem]]
- [[Agent Loop]]
- [[Manus]]
