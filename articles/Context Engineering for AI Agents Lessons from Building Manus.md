---
title: "Context Engineering for AI Agents: Lessons from Building Manus"
source: https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
author:
  - "[[constantly rewriting the todo list]]"
  - "[[Manus is]]"
published: 2025-07-18
created: 2026-04-09
description: This post shares the local optima Manus arrived at through our own "SGD". If you're building your own AI agent, we hope these principles help you converge faster.
tags:
  - articles
---
[Manus is now part of Meta — bringing AI to businesses worldwide  
Manus 现已成为 Meta 的一部分，致力于将人工智能带给全球企业。](https://manus.im/team)

·Friday, July 18 7月18日，星期五

## Context Engineering for AI Agents: Lessons from Building Manus面向人工智能代理的上下文工程：来自“构建 Manus”项目的经验教训

![[eaafe9e6a174b29458c314ccc225dbdd39a7c9d66e60786235165d9aba23f578.webp]]

2025/7/18 --Yichao 'Peak' Ji  
2025/7/18 - - 纪一超‘巅峰’

At the very beginning of the [Manus](https://manus.im/app) project, my team and I faced a key decision: should we train an end-to-end agentic model using open-source foundations, or build an agent on top of the [in-context learning](https://arxiv.org/abs/2301.00234) abilities of frontier models?  
在 [Manus](https://manus.im/app) 项目伊始 ，我和我的团队面临着一个关键的决定：我们应该使用开源基础训练一个端到端的智能体模型，还是在前沿模型的 [上下文学习](https://arxiv.org/abs/2301.00234) 能力之上构建一个智能体？

Back in my first decade in NLP, we didn't have the luxury of that choice. In the distant days of [BERT](https://arxiv.org/abs/1810.04805) (yes, it's been seven years), models had to be fine-tuned—and evaluated—before they could transfer to a new task. That process often took weeks per iteration, even though the models were tiny compared to today's LLMs. For fast-moving applications, especially pre–PMF, such slow feedback loops are a deal-breaker. That was a bitter lesson from my last startup, where I trained models from scratch for [open information extraction](https://en.wikipedia.org/wiki/Open_information_extraction) and semantic search. Then came [GPT-3](https://arxiv.org/abs/2005.14165) and [Flan-T5](https://arxiv.org/abs/2210.11416), and my in-house models became irrelevant overnight. Ironically, those same models marked the beginning of in-context learning—and a whole new path forward.  
在我从事自然语言处理的第一个十年里，我们没有这种选择的余地。在遥远的 [BERT](https://arxiv.org/abs/1810.04805) 时代 （没错，已经过去七年了），模型必须经过微调和评估才能迁移到新的任务。即使当时的模型与如今的 LLM 相比规模很小，这个过程每次迭代通常也需要数周时间。对于快速发展的应用，尤其是在 PMF 出现之前，如此缓慢的反馈循环是致命的。这是我在上一家创业公司惨痛的教训，当时我从零开始训练模型，用于 [开放信息抽取](https://en.wikipedia.org/wiki/Open_information_extraction) 和语义搜索。后来 [GPT-3](https://arxiv.org/abs/2005.14165) 和 [Flan-T5](https://arxiv.org/abs/2210.11416) 出现了 ，我内部开发的模型一夜之间就过时了。讽刺的是，正是这些模型标志着上下文学习的开始——以及一条全新的发展道路。

That hard-earned lesson made the choice clear: Manus would bet on context engineering. This allows us to ship improvements in hours instead of weeks, and kept our product orthogonal to the underlying models: If model progress is the rising tide, we want Manus to be the boat, not the pillar stuck to the seabed.  
那次来之不易的教训让我们明确了选择： Manus 将押注于情境工程 。这使我们能够在数小时内而非数周内交付改进，并确保我们的产品与底层模型保持正交： 如果模型进步是涨潮，我们希望 Manus 是乘风破浪的船 ，而不是固定在海底的柱子。

Still, context engineering turned out to be anything but straightforward. It's an experimental science—and we've rebuilt our agent framework four times, each time after discovering a better way to shape context. We affectionately refer to this manual process of architecture searching, prompt fiddling, and empirical guesswork as "Stochastic Graduate Descent". It's not elegant, but it works.  
然而，上下文工程远非易事。它是一门实验科学——我们已经四次重构了代理框架，每次都是在发现更好的上下文构建方式之后。我们亲切地将这种手动架构搜索、提示调整和经验猜测的过程称为“ 随机研究生下降法 ”。它并不优雅，但行之有效。

This post shares the local optima we arrived at through our own "SGD". If you're building your own AI agent, I hope these principles help you converge faster.  
本文分享了我们通过自主开发的“随机梯度下降法”（SGD）找到的局部最优解。如果您正在构建自己的 AI 智能体，希望这些原则能帮助您更快地收敛。

### Design Around the KV-Cache围绕 KV 缓存进行设计

If I had to choose just one metric, I'd argue that the KV-cache hit rate is the single most important metric for a production-stage AI agent. It directly affects both latency and cost. To understand why, let's look at how [a typical agent](https://arxiv.org/abs/2210.03629) operates:  
如果只能选择一个指标，我会认为键值缓存命中率是生产阶段人工智能代理最重要的指标。它直接影响延迟和成本。为了理解原因，我们来看看 [一个典型的代理](https://arxiv.org/abs/2210.03629) 是如何运行的：

After receiving a user input, the agent proceeds through a chain of tool uses to complete the task. In each iteration, the model selects an action from a predefined action space based on the current context. That action is then executed in the environment (e.g., Manus's virtual machine sandbox) to produce an observation. The action and observation are appended to the context, forming the input for the next iteration. This loop continues until the task is complete.  
接收到用户输入后，智能体会按照一系列工具的使用步骤完成任务。在每次迭代中，模型会根据当前上下文从预定义的动作空间中选择一个动作 。然后，该动作会在环境 （例如，Manus 的虚拟机沙箱）中执行，生成一个观察结果 。该动作和观察结果会被添加到上下文中，作为下一次迭代的输入。这个循环会一直持续到任务完成。

As you can imagine, the context grows with every step, while the output—usually a structured function call—remains relatively short. This makes the ratio between prefilling and decoding highly skewed in agents compared to chatbots. In Manus, for example, the average input-to-output token ratio is around 100:1.  
正如您所想，上下文会随着每一步操作而不断增长，而输出（通常是结构化的函数调用）则相对较短。这使得代理程序中预填充和解码之间的比例与聊天机器人相比严重失衡。例如，在 Manus 中，平均输入输出令牌比例约为 100:1 。

Fortunately, contexts with identical prefixes can take advantage of [KV-cache](https://medium.com/@joaolages/kv-caching-explained-276520203249), which drastically reduces time-to-first-token (TTFT) and inference cost—whether you're using a self-hosted model or calling an inference API. And we're not talking about small savings: with Claude Sonnet, for instance, cached input tokens cost 0.30 USD/MTok, while uncached ones cost 3 USD/MTok—a 10x difference.  
幸运的是，具有相同前缀的上下文可以利用 [键值缓存（KV-cache](https://medium.com/@joaolages/kv-caching-explained-276520203249) ），从而大幅降低首次词元获取时间（TTFT） 和推理成本——无论您使用的是自托管模型还是调用推理 API。而且节省的成本相当可观：例如，使用 Claude Sonnet 模型时，缓存的输入词元成本为 0.30 美元/MTok ，而未缓存的输入词元成本为 3 美元/MTok—— 相差 10 倍。

![[OhdKxGRSXCcuqOvz.png]]

From a context engineering perspective, improving KV-cache hit rate involves a few key practices:  
从上下文工程的角度来看，提高键值缓存命中率涉及以下几个关键实践：

1.Keep your prompt prefix stable. Due to the [autoregressive](https://en.wikipedia.org/wiki/Autoregressive_model) nature of LLMs, even a single-token difference can invalidate the cache from that token onward. A common mistake is including a timestamp—especially one precise to the second—at the beginning of the system prompt. Sure, it lets the model tell you the current time, but it also kills your cache hit rate.  
保持提示符前缀的稳定。 由于 LLM 的 [自回归](https://en.wikipedia.org/wiki/Autoregressive_model) 特性，即使单个标记的差异也可能导致从该标记开始的缓存失效。一个常见的错误是在系统提示符的开头添加时间戳——尤其是精确到秒的时间戳。诚然，这可以让模型告诉你当前时间，但也会严重降低缓存命中率。

2.Make your context append-only. Avoid modifying previous actions or observations. Ensure your serialization is deterministic. Many programming languages and libraries don't guarantee stable key ordering when serializing JSON objects, which can silently break the cache.  
确保上下文仅追加。 避免修改之前的操作或观察结果。确保序列化过程是确定性的。许多编程语言和库在序列化 JSON 对象时无法保证键顺序的稳定性，这可能会悄无声息地破坏缓存。

3.Mark cache breakpoints explicitly when needed. Some model providers or inference frameworks don't support automatic incremental prefix caching, and instead require manual insertion of cache breakpoints in the context. When assigning these, account for potential cache expiration and at minimum, ensure the breakpoint includes the end of the system prompt.  
必要时显式标记缓存断点。 某些模型提供程序或推理框架不支持自动增量前缀缓存，而是需要手动在上下文中插入缓存断点。分配这些断点时，请考虑缓存过期的可能性，并且至少要确保断点包含系统提示符的末尾。

Additionally, if you're self-hosting models using frameworks like [vLLM](https://github.com/vllm-project/vllm), make sure [prefix/prompt caching](https://docs.vllm.ai/en/stable/design/v1/prefix_caching.html) is enabled, and that you're using techniques like session IDs to route requests consistently across distributed workers.  
此外，如果您使用 [vLLM](https://github.com/vllm-project/vllm) 等框架自行托管模型 ，请确保启用 [前缀/提示缓存](https://docs.vllm.ai/en/stable/design/v1/prefix_caching.html) ，并使用会话 ID 等技术在分布式工作进程之间一致地路由请求。

### Mask, Don't Remove 面膜，请勿摘下

As your agent takes on more capabilities, its action space naturally grows more complex—in plain terms, the number of tools explodes. The recent popularity of [MCP](https://modelcontextprotocol.io/introduction) only adds fuel to the fire. If you allow user-configurable tools, trust me: someone will inevitably plug hundreds of mysterious tools into your carefully curated action space. As a result, the model is more likely to select the wrong action or take an inefficient path. In short, your heavily armed agent gets dumber.  
随着智能体掌握更多功能，其行动空间自然会变得更加复杂——简单来说， 工具的数量会呈爆炸式增长。最近 [MCP](https://modelcontextprotocol.io/introduction) 的流行更是火上浇油。如果你允许用户配置工具，相信我：肯定会有人把数百个来路不明的工具塞进你精心设计的行动空间里。结果就是，模型更容易选择错误的行动或走上低效的路径。简而言之，你装备精良的智能体反而会变得更笨。

A natural reaction is to design a dynamic action space—perhaps loading tools on demand using something [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) -like. We tried that in Manus too. But our experiments suggest a clear rule: unless absolutely necessary, avoid dynamically adding or removing tools mid-iteration. There are two main reasons for this:  
一个自然而然的反应是设计一个动态操作空间——或许可以像 [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) 那样按需加载工具 。我们在 Manus 中也尝试过这种方法。但我们的实验表明了一条明确的规则：除非绝对必要，否则应避免在迭代过程中动态添加或移除工具 。这主要有两个原因：

1.In most LLMs, tool definitions live near the front of the context after serialization, typically before or after the system prompt. So any change will invalidate the KV-cache for all subsequent actions and observations.  
在大多数 LLM 中，工具定义在序列化后位于上下文的前端附近，通常在系统提示符之前或之后。因此，任何更改都会使键值缓存失效，从而影响所有后续操作和观察结果。

2.When previous actions and observations still refer to tools that are no longer defined in the current context, the model gets confused. Without [constrained decoding](https://platform.openai.com/docs/guides/structured-outputs), this often leads to schema violations or hallucinated actions.  
当先前的行为和观察仍然指向当前上下文中已不再定义的工具时，模型就会出现混乱。如果没有 [约束解码](https://platform.openai.com/docs/guides/structured-outputs) ，这通常会导致模式违背或出现幻觉行为 。

To solve this while still improving action selection, Manus uses a context-aware [state machine](https://en.wikipedia.org/wiki/Finite-state_machine) to manage tool availability. Rather than removing tools, it masks the token logits during decoding to prevent (or enforce) the selection of certain actions based on the current context.  
为了解决这个问题并同时改进操作选择，Manus 使用上下文感知 [状态机](https://en.wikipedia.org/wiki/Finite-state_machine) 来管理工具可用性。它不会移除工具，而是在解码过程中屏蔽令牌日志， 从而根据当前上下文阻止（或强制）选择某些操作。

![[cWxINCvUfrmlbvfV.png]]

In practice, most model providers and inference frameworks support some form of response prefill, which allows you to constrain the action space without modifying the tool definitions. There are generally three modes of function calling (we'll use the [Hermes format](https://github.com/NousResearch/Hermes-Function-Calling) from NousResearch as an example):  
实际上，大多数模型提供商和推理框架都支持某种形式的响应预填充 ，这允许您在不修改工具定义的情况下限制操作空间 。函数调用通常有三种模式（我们将以 NousResearch 的 [Hermes 格式](https://github.com/NousResearch/Hermes-Function-Calling) 为例）：

•Auto – The model may choose to call a function or not. Implemented by prefilling only the reply prefix: <|im\_start|>assistant  
自动 – 该模型可以选择是否调用某个函数。实现方式为仅预填充回复前缀： <|im\_start|>assistant

•Required – The model must call a function, but the choice is unconstrained. Implemented by prefilling up to tool call token: <|im\_start|>assistant<tool\_call>  
必填项 – 模型必须调用一个函数，但函数选择不受限制。实现方式为预填充工具调用令牌： <|im\_start|>assistant<tool\_call>

•Specified – The model must call a function from a specific subset. Implemented by prefilling up to the beginning of the function name: <|im\_start|>assistant<tool\_call>{"name": “browser\_  
已指定 – 模型必须调用特定子集中的函数 。实现方式为：预填充函数名称的开头部分： <|im\_start|>assistant<tool\_call>{"name": "browser\_

Using this, we constrain action selection by masking token logits directly. For example, when the user provides a new input, Manus must reply immediately instead of taking an action. We've also deliberately designed action names with consistent prefixes—e.g., all browser-related tools start with browser\_, and command-line tools with shell\_. This allows us to easily enforce that the agent only chooses from a certain group of tools at a given state without using stateful logits processors.  
利用这种方法，我们直接屏蔽令牌日志来限制操作选择。例如，当用户输入新内容时，Manus 必须立即回复，而不能执行任何操作。我们还特意设计了具有一致前缀的操作名称——例如，所有浏览器相关的工具都以 \`browser\_\` 开头 ，命令行工具则以 \`shell\_\` 开头 。这样，我们就可以轻松地强制代理在给定状态下仅从特定工具组中进行选择， 而无需使用有状态日志处理器 。

These designs help ensure that the Manus agent loop remains stable—even under a model-driven architecture.  
这些设计有助于确保 Manus 代理循环保持稳定——即使在模型驱动架构下也是如此。

### Use the File System as Context以文件系统为上下文

Modern frontier LLMs now offer context windows of 128K tokens or more. But in real-world agentic scenarios, that's often not enough, and sometimes even a liability. There are three common pain points:  
现代前沿 LLM（逻辑生命周期管理）现在提供的上下文窗口可达 12.8 万个代币或更多。但在现实世界的智能体场景中，这通常不够，有时甚至会成为一种劣势。常见的痛点有三个：

1.Observations can be huge, especially when agents interact with unstructured data like web pages or PDFs. It's easy to blow past the context limit.  
观察数据量可能非常庞大 ，尤其是在智能体与网页或 PDF 等非结构化数据交互时。很容易超出上下文限制。

2.Model performance tends to degrade beyond a certain context length, even if the window technically supports it.  
即使窗口在技术上支持， 模型性能在超过一定上下文长度后也往往会下降 。

3.Long inputs are expensive, even with prefix caching. You're still paying to transmit and prefill every token.  
即使使用前缀缓存， 长输入也很耗费成本 。你仍然需要为传输和预填充每个令牌付费。

To deal with this, many agent systems implement context truncation or compression strategies. But overly aggressive compression inevitably leads to information loss. The problem is fundamental: an agent, by nature, must predict the next action based on all prior state—and you can't reliably predict which observation might become critical ten steps later. From a logical standpoint, any irreversible compression carries risk.  
为了解决这个问题，许多智能体系统都采用了上下文截断或压缩策略。但过度压缩不可避免地会导致信息丢失。问题根源在于：智能体本质上必须基于所有先前的状态来预测下一步行动——而你无法可靠地预测十步之后哪些观察结果会变得至关重要。从逻辑角度来看，任何不可逆的压缩都存在风险。

That's why we treat the file system as the ultimate context in Manus: unlimited in size, persistent by nature, and directly operable by the agent itself. The model learns to write to and read from files on demand—using the file system not just as storage, but as structured, externalized memory.  
因此，在 Manus 中，我们将文件系统视为最终上下文 ：它容量无限、本质上是持久的，并且可以由代理直接操作。该模型学习按需读写文件——将文件系统不仅用作存储，而且用作结构化的、外部化的内存。

![[sBITCOxGnHNUPHTD.png]]

Our compression strategies are always designed to be restorable. For instance, the content of a web page can be dropped from the context as long as the URL is preserved, and a document's contents can be omitted if its path remains available in the sandbox. This allows Manus to shrink context length without permanently losing information.  
我们的压缩策略始终以可恢复性为设计目标 。例如，只要保留 URL，就可以从上下文中移除网页内容；如果文档路径在沙箱中仍然可用，则可以省略文档内容。这使得 Manus 能够在不永久丢失信息的情况下缩短上下文长度。

While developing this feature, I found myself imagining what it would take for a State Space Model (SSM) to work effectively in an agentic setting. Unlike Transformers, SSMs lack full attention and struggle with long-range backward dependencies. But if they could master file-based memory—externalizing long-term state instead of holding it in context—then their speed and efficiency might unlock a new class of agents. Agentic SSMs could be the real successors to [Neural Turing Machines](https://arxiv.org/abs/1410.5401).  
在开发这项功能的过程中，我一直在思考状态空间模型（SSM） 如何在智能体环境中高效运行。与 Transformer 不同，SSM 缺乏完全注意力机制，并且难以处理长程反向依赖关系。但如果它们能够掌握基于文件的记忆——将长期状态外部化而不是将其保存在上下文中——那么它们的运行速度和效率或许能够催生出一类全新的智能体。智能体 SSM 或许会成为 [神经图灵机](https://arxiv.org/abs/1410.5401) 的真正继承者 。

### Manipulate Attention Through Recitation通过背诵来操纵注意力

If you've worked with Manus, you've probably noticed something curious: when handling complex tasks, it tends to create a todo.md file—and update it step-by-step as the task progresses, checking off completed items.  
如果你用过 Manus，你可能已经注意到一些有趣的事情：在处理复杂任务时，它倾向于创建一个 todo.md 文件，并随着任务的进行逐步更新该文件，勾选已完成的项目。

That's not just cute behavior—it's a deliberate mechanism to manipulate attention.  
这不仅仅是可爱的行为——这是一种刻意操纵注意力的机制 。

![[OYpTzfPZaBeeWFOx.png]]

A typical task in Manus requires around 50 tool calls on average. That's a long loop—and since Manus relies on LLMs for decision-making, it's vulnerable to drifting off-topic or forgetting earlier goals, especially in long contexts or complicated tasks.  
Manus 的典型任务平均需要大约 50 次工具调用 。这是一个很长的循环——而且由于 Manus 依赖于逻辑逻辑模型 (LLM) 进行决策，因此它很容易偏离主题或忘记之前的目标，尤其是在处理较长的任务或复杂的任务时。

By constantly rewriting the todo list, Manus is reciting its objectives into the end of the context. This pushes the global plan into the model's recent attention span, avoiding "lost-in-the-middle" issues and reducing goal misalignment. In effect, it's using natural language to bias its own focus toward the task objective—without needing special architectural changes.  
通过不断重写待办事项列表，Manus 将目标置于上下文的最后 。这使得全局计划能够进入模型的近期注意力范围，避免“ 迷失在中间 ”的问题，并减少目标不一致的情况。实际上，它利用自然语言将自身注意力集中到任务目标上——而无需进行任何特殊的架构更改。

### Keep the Wrong Stuff In把不该放的东西留在里面

Agents make mistakes. That's not a bug—it's reality. Language models hallucinate, environments return errors, external tools misbehave, and unexpected edge cases show up all the time. In multi-step tasks, failure is not the exception; it's part of the loop.  
智能体会犯错。这不是漏洞，而是现实。语言模型会产生幻觉，环境会返回错误，外部工具会运行异常，意想不到的极端情况也时有发生。在多步骤任务中，失败并非例外，而是循环的一部分。

And yet, a common impulse is to hide these errors: clean up the trace, retry the action, or reset the model's state and leave it to the magical " [temperature](https://arxiv.org/abs/2405.00492) ". That feels safer, more controlled. But it comes at a cost: Erasing failure removes evidence. And without evidence, the model can't adapt.  
然而，人们常常会倾向于掩盖这些错误：清除痕迹、重试操作，或者重置模型状态，让它自行“适应 [”](https://arxiv.org/abs/2405.00492) 。这样做感觉更安全、更可控。但这是有代价的： 抹去失败会清除证据 。而没有证据，模型就无法适应变化。

![[dBjZlVbKJVhjgQuF.png]]

In our experience, one of the most effective ways to improve agent behavior is deceptively simple: leave the wrong turns in the context. When the model sees a failed action—and the resulting observation or stack trace—it implicitly updates its internal beliefs. This shifts its prior away from similar actions, reducing the chance of repeating the same mistake.  
根据我们的经验，提升智能体行为最有效的方法之一看似简单： 允许错误操作保留在上下文中 。当模型观察到失败的操作及其产生的观测结果或堆栈跟踪时，它会隐式地更新其内部信念。这会使其先验知识偏离类似操作，从而降低重复犯同样错误的概率。 In fact, we believe error recovery is one of the clearest indicators of true agentic behavior. Yet it's still underrepresented in most academic work and public benchmarks, which often focus on task success under ideal conditions.  
事实上，我们认为错误恢复是衡量真正自主行为最清晰的指标之一。然而，在大多数学术研究和公开基准测试中，错误恢复仍然被忽视，这些研究和测试通常侧重于理想条件下的任务成功率。

### Don't Get Few-Shotted 别被几枪毙命

[Few-shot prompting](https://www.promptingguide.ai/techniques/fewshot) is a common technique for improving LLM outputs. But in agent systems, it can backfire in subtle ways.  
[少样本提示](https://www.promptingguide.ai/techniques/fewshot) 是提高逻辑学习模型（LLM）输出的常用技术。但在智能体系统中，它可能会以一些不易察觉的方式产生反作用。

Language models are excellent mimics; they imitate the pattern of behavior in the context. If your context is full of similar past action-observation pairs, the model will tend to follow that pattern, even when it's no longer optimal.  
语言模型是优秀的模仿者；它们会模仿上下文中的行为模式 。如果你的上下文充满了类似的过往行为-观察对，即使这种模式不再是最优的，模型也倾向于遵循它。

This can be dangerous in tasks that involve repetitive decisions or actions. For example, when using Manus to help review a batch of 20 resumes, the agent often falls into a rhythm—repeating similar actions simply because that's what it sees in the context. This leads to drift, overgeneralization, or sometimes hallucination.  
在涉及重复性决策或操作的任务中，这可能会很危险。例如，当使用 Manus 来辅助审核一批 20 份简历时，智能体常常会陷入一种固定的模式——仅仅因为上下文中存在类似的操作，就重复执行相同的操作。这会导致判断偏差、过度概括，甚至有时还会出现幻觉。

![[IIyBBdwwuMDJUnUc.png]]

The fix is to increase diversity. Manus introduces small amounts of structured variation in actions and observations—different serialization templates, alternate phrasing, minor noise in order or formatting. This controlled randomness helps break the pattern and tweaks the model's attention.  
解决方法是增加多样性 。Manus 在动作和观察中引入少量结构化变化——不同的序列化模板、不同的措辞、顺序或格式上的细微差异。这种可控的随机性有助于打破固有模式，并调整模型的注意力。 In other words, don't few-shot yourself into a rut. The more uniform your context, the more brittle your agent becomes.  
换句话说， 不要让自己陷入僵化的模式 。你的环境越单一，你的代理人就越脆弱。

### Conclusion 结论

Context engineering is still an emerging science—but for agent systems, it's already essential. Models may be getting stronger, faster, and cheaper, but no amount of raw capability replaces the need for memory, environment, and feedback. How you shape the context ultimately defines how your agent behaves: how fast it runs, how well it recovers, and how far it scales.  
情境工程仍是一门新兴科学，但对于智能体系统而言，它已至关重要。模型或许会变得更强大、更快、更便宜，但再强大的原始能力也无法取代对内存、环境和反馈的需求。你如何塑造情境最终决定了智能体的行为：它的运行速度、恢复能力以及可扩展性。

At Manus, we've learned these lessons through repeated rewrites, dead ends, and real-world testing across millions of users. None of what we've shared here is universal truth—but these are the patterns that worked for us. If they help you avoid even one painful iteration, then this post did its job.  
在 Manus，我们通过反复重写、试错以及数百万用户的真实测试， 总结出了这些经验教训 。我们在此分享的并非放之四海而皆准的真理，但这些模式对我们行之有效。如果它们能帮助您避免哪怕一次痛苦的迭代，那么这篇文章就达到了目的。

The agentic future will be built one context at a time. Engineer them well.  
智能体的未来将一步步构建，精心设计每一个场景。

## Less structure, more intelligence.减少结构，增加智慧。

### Community 社区

[Events 活动](https://events.manus.im/) [Fellows 研究员](https://manus.im/fellows)

### Compare 比较

[VS ChatGPT](https://manus.im/compare/vs-chatgpt) [VS Lovable VS 可爱的](https://manus.im/compare/lovable)

### Business 商业

[Team plan 团队计划](https://manus.im/team) [SSO 单点登录](https://help.manus.im/en/articles/12807937-where-can-i-enable-subscribe-to-a-single-sign-on-sso-subscription-for-manus-team) [API](https://open.manus.ai/docs)