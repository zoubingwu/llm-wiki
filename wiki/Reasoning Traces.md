---
type: concept
created: 2026-08-21
updated: 2026-08-21
tags:
  - concept
  - LLM
  - reasoning
  - scratchpad
source_count: 1
---

# Reasoning Traces

Reasoning traces（推理轨迹）是模型在最终答案之前生成的中间文本。[[What Is Reasoning]] 的核心判断是：它们不是与普通输出完全不同的神秘对象，而是模型经过训练后，写入 scratchpad 或特定输出 channel 的文本序列。

## 格式与路由

以 GPT-OSS 的 Harmony 格式为例，模型先输出 `analysis` channel，再输出 `final` channel：

```text
<|channel|>analysis<|message|>
...scratch work...
<|end|><|start|>assistant<|channel|>final<|message|>
...answer...
```

channel 标记是特殊 token；标记之间的内容仍然由普通文本 token 构成。当采样到 `analysis` channel token 后，解析器可以把后续文本路由到独立流，供 Responses API 或 UI 使用。闭源模型则可能在暴露前对轨迹进行删减和摘要。

## 为什么需要单独处理

推理轨迹可能很长、很混乱，也不一定适合直接展示给用户。因此 UI 至少要能识别它们，区分“模型的工作草稿”和“面向用户的最终答案”。这也意味着“隐藏推理”首先是输出路由和产品呈现问题，而不是把文本变成另一种物质。

## 与 Scratchpads 的关系

推理轨迹是模型内部生成的临时 scratchpad；[[Scratchpads]] 则通常指由 agent 或系统写入外部存储的计划、笔记和中间产物。两者都承担保持中间工作结果的作用，但持久性、可见性和安全边界不同。

## 相关页面

- [[What Is Reasoning]]
- [[Reasoning Effort]]
- [[Scratchpads]]
- [[Agent Loop]]
- [[Context Engineering]]
