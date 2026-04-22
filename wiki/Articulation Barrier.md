---
type: concept
created: 2026-04-22
updated: 2026-04-22
tags:
  - AI
  - UX
  - prompt
source_count: 1
---

# Articulation Barrier

表达障碍（Articulation Barrier）是指用户很难把自己的真实意图完整、准确地表达给 AI，因此系统虽然能生成内容，却难以稳定理解真正目标。

## 为什么会出现

把新需求写成描述性文字，本身就比阅读和挑选更耗认知。

这个障碍在三类场景里尤其明显：

- 目标本来就是非语言的，例如视觉风格、空间感、氛围
- 用户缺少足够强的文字表达能力
- 用户需要反复重述偏好、例外、风险承受能力和长期约束

## 它同时也是记忆问题

如果系统每次都要求用户重新说明偏好、语气、预算和边界，表达障碍就会持续存在。

成熟的意图式系统需要把用户模型做成可见、可编辑的界面，让用户可以检查系统记住了什么、临时覆盖什么、何时要求遗忘。这使 [[Long-term Memory for LLMs]] 从后台机制变成前台 UX 能力。

## 常见缓解方式

- **Prompt Augmentation（提示增强）**：通过模板、样例、风格库帮助用户补全表达
- **Aided Prompt Understanding（辅助提示理解）**：系统先拆解用户需求，再引导补充缺失信息
- **Multimodal Input（多模态输入）**：允许用户用语音、图像、屏幕上下文或素材集合表达意图

## 更长期的方向

短期内，系统会继续帮助用户把想法写清楚。

更长期的方向是 [[Intent by Discovery]]：用户通过比较、探索和修改候选方案来逐步发现自己真正想要的结果。

## 相关概念

- [[Intent-based Outcome Specification]]
- [[Long-term Memory for LLMs]]
- [[Intent by Discovery]]
- [[Intent by Discovery Designing the AI User Experience]]
