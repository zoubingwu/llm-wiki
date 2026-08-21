---
title: "What Is Reasoning"
source: "https://lucumr.pocoo.org/2026/8/19/what-is-reasoning/"
author:
  - "[[Armin Ronacher]]"
published: 2026-08-19
created: 2026-08-21
description: "A short summary of how reasoning traces work."
tags:
  - "articles"
---
A few weeks ago [a paper was shared](https://arxiv.org/html/2608.09867v1) that showed how to extract reasoning traces from closed-weight models. Together with online discussions about tricking models into leaking them, it made me investigate it more out of curiosity. Twitter seems full of half-truths and confusion about how this works, so perhaps this helps some to understand what is happening.

几周前，有人分享了一篇[展示如何从闭源权重模型中提取推理轨迹的论文](https://arxiv.org/html/2608.09867v1)。再加上网上关于诱导模型泄露推理轨迹的讨论，我出于好奇进一步研究了这个问题。Twitter 上似乎充斥着关于其工作方式的半真半假说法和混淆，希望这篇文章能帮助一些人理解实际发生了什么。

## Hiding Traces

隐藏推理轨迹

Reasoning traces are usually hidden from us. [We have lamented this](https://earendil.com/posts/session-portability/), but mostly have to accept it. Open-weight models thankfully reveal them, and from their behavior you can see that their traces can be long and confusing. This is probably a good reason to separate them from what is normally shown to users.

推理轨迹通常对我们不可见。[我们曾对此表示遗憾](https://earendil.com/posts/session-portability/)，但大多数时候也只能接受这一点。值得庆幸的是，开放权重模型会展示这些轨迹；从它们的行为中可以看出，推理轨迹可能很长，也可能令人困惑。这或许正是应该把它们与通常展示给用户的内容分开的一个好理由。

At minimum, UIs need to detect them. The industry has done a good job at making reasoning traces sound special and exotic, but they really are just text: the model is trained to emit its thinking into a scratchpad as part of its response, before its final answer.

至少，UI 需要能够检测到它们。业界成功地把推理轨迹描述得特殊而神秘，但它们本质上只是文本：模型经过训练，会在最终答案之前，把思考内容作为响应的一部分输出到一个 scratchpad（草稿区）中。

GPT-OSS’s Harmony response format makes this easy to see:

GPT-OSS 的 Harmony 响应格式让这一点一目了然：

```
<|channel|>analysis<|message|>
I need to work this out ...
<|end|><|start|>assistant<|channel|>final<|message|>
The answer is ...
<|return|>
```

The markers are special tokens, but the reasoning between them uses “the same text” as the final answer (just that GPT chain-of-thought text sounds really funny). When the model samples the `analysis` channel token, a parser routes the following text into a separate stream exposed through the Responses API. For closed models, presumably a simple model redacts and summarizes it.

这些标记是特殊词元，但标记之间的推理内容使用的仍然是和最终答案“相同的文本”（只是 GPT 的 chain-of-thought 文本听起来确实很滑稽）。当模型采样出 `analysis` channel 的词元时，解析器会把后续文本路由到一条独立流中，并通过 Responses API 暴露出来。对于闭源模型，推测是由一个简单模型对这部分内容进行删减和摘要。

## Reasoning Effort

推理力度

How much budget goes to reasoning? Earlier APIs exposed reasoning token budgets, making it seem like a property of the sampling process. In reality, reasoning effort is baked into the system prompt. GPT-OSS puts this into the system prompt:

有多少预算会用于推理？早期 API 暴露了 reasoning token budget（推理词元预算），让人以为它是采样过程本身的属性。实际上，reasoning effort（推理力度）被写进了 system prompt（系统提示）。GPT-OSS 会把下面这一行放进系统提示：

```
Reasoning: low
```

That’s it. Training produces the resulting behavior, such as emitting the token sequence that switches to the `analysis` channel. This also explains why changing the effort invalidates the KV cache. I think closed GPT models call reasoning effort “juice,” since you can ask most models how much juice they have.

就这样。训练会产生相应的行为，例如输出切换到 `analysis` channel 的词元序列。这也解释了为什么改变推理力度会使 KV cache（KV 缓存）失效。我想，闭源 GPT 模型把 reasoning effort 称为 “juice”，因为你可以问大多数模型自己还剩多少 juice。

In [DwarfStar](https://github.com/antirez/ds4) for DeepSeek with max reasoning this is added to the system prompt:

在面向 DeepSeek、启用最大推理力度的 [DwarfStar](https://github.com/antirez/ds4) 中，系统提示会加入以下内容：

```
Reasoning Effort: Absolute maximum with no shortcuts permitted.
You MUST be very thorough in your thinking and comprehensively decompose the
problem to resolve the root cause, rigorously stress-testing your logic against
all potential paths, edge cases, and adversarial scenarios.
```

## Don’t Think

不要思考

The destination of reasoning tokens is therefore a learned convention: the model is trained to keep scratch work out of the `final` channel. Trick it into thinking it is in that channel and it may leak tokens. We have even seen older models, when thinking is disabled, reason into the bash tool and echo their thoughts to `/dev/null`.

因此，推理词元的去向是一种通过训练学会的约定：模型被训练为不把草稿内容放进 `final` channel。只要诱导模型相信自己正处于该 channel，它就可能泄露这些词元。我们甚至见过一些旧模型在关闭思考后，把推理内容写入 bash 工具，并将其回显到 `/dev/null`。

So in some sense the only “special” behavior for some models is not to think. That at times is done by “mechanically” removing the model’s usual ways to think. In [DwarfStar](https://github.com/antirez/ds4), disabled thinking uses the prefill `</think>`, while enabled thinking uses `<think>`, which are the tokens that close and start thinking. GPT-OSS doesn’t prefill but lets the model decide either way on its own.

所以，从某种意义上说，对一些模型而言，唯一“特殊”的行为反而是不思考。有时，这通过“机械地”移除模型通常用来思考的路径来实现。在 [DwarfStar](https://github.com/antirez/ds4) 中，关闭思考时使用预填充 `</think>`，开启思考时使用 `<think>`；这两个词元分别用于结束和开始思考。GPT-OSS 不进行预填充，而是让模型自行决定是否思考。

But presumably, some inference APIs prefill the opening token when reasoning is enabled, so the model never samples it itself and might prevent the sampling of the reasoning token when disabled since it can be trivially detected. This may explain why a [custom `think` tool](https://gist.github.com/mitsuhiko/0904a3d89741e8e3bcca1ca93ea076de) can trick models into putting some reasoning where it should not go — but only when native reasoning is disabled.

不过可以推测，一些推理 API 在启用推理时会预填充开头词元，因此模型不会自行采样它；而在关闭推理时，API 可能会阻止模型采样推理词元，因为这种行为很容易被检测出来。这或许解释了为什么一个[自定义的 `think` 工具](https://gist.github.com/mitsuhiko/0904a3d89741e8e3bcca1ca93ea076de)能够诱导模型把一部分推理放到不该出现的位置——但这只会在原生推理被禁用时发生。

Fun fact: this blog post triggered safey checks

有趣的是：这篇博客文章触发了安全检查。

Hilariously enough I was unable to use GPT 5.6 terra for spell and grammar checking on this blog post because of safety filters. Had to switch to Kimi.

颇为滑稽的是，因为安全过滤器，我没法使用 GPT 5.6 terra 为这篇博客做拼写和语法检查，只好换成 Kimi。

![[gpt-5.6-terra-spell-check.png|GPT-5.6-terra refusing to spell-check this blog post]]

GPT-5.6-terra 拒绝为这篇博客做拼写检查。

[copy as](https://lucumr.pocoo.org/2026/8/19/what-is-reasoning.md) / [view](https://lucumr.pocoo.org/2026/8/19/what-is-reasoning.md) markdown

[复制为 Markdown](https://lucumr.pocoo.org/2026/8/19/what-is-reasoning.md) / [查看 Markdown](https://lucumr.pocoo.org/2026/8/19/what-is-reasoning.md)
