---
type: source
created: 2026-08-21
updated: 2026-08-21
tags:
  - source
  - LLM
  - reasoning
  - inference
source_count: 1
---

# What Is Reasoning

[[Armin Ronacher]] 关于 LLM reasoning traces（推理轨迹）如何工作的短文。文章把“思考”还原为模型输出文本的一种训练约定：模型可以先把文本写入 scratchpad 或 `analysis` channel，再生成 `final` channel；所谓 reasoning effort（推理力度）主要通过 system prompt 和训练行为控制，而不是神秘的独立采样能力。

## 核心论点

- **推理轨迹本质上是文本**：开放权重模型会把中间草稿输出出来；特殊的是 channel 标记和解析路由，而不是文本本身。
- **UI 需要识别轨迹**：GPT-OSS 的 Harmony 格式用特殊 token 区分 `analysis` 与 `final`，解析器可以把 analysis 内容路由到 Responses API 的独立流；闭源模型可能再对这部分内容做删减和摘要。
- **推理力度写在系统提示中**：例如 GPT-OSS 使用 `Reasoning: low`；改变该设置可能让 KV cache 失效，因为 system prompt 发生了变化。
- **关闭推理也可能是格式控制**：DwarfStar 通过 prefill `</think>` / `<think>` 控制思考边界；某些旧模型在关闭思考时仍可能把推理写入工具输出。

## 相关页面

- [[Reasoning Traces]] — 推理文本与最终答案的分离
- [[Reasoning Effort]] — 通过系统提示和训练约定控制推理预算
- [[Scratchpads]] — 外部草稿区在上下文工程中的角色
- [[KV-Cache]] — 改变 system prompt 为什么会影响缓存复用
- [[AI Inference Engineering]] — 推理 API、采样和服务工程背景
