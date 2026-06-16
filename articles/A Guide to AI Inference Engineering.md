---
title: "A Guide to AI Inference Engineering"
source: "https://blog.bytebytego.com/p/a-guide-to-ai-inference-engineering?utm_source=post-email-title&publication_id=817132&post_id=198890332&utm_campaign=email-post-title&isFreemail=true&r=1kd8ba&triedRedirect=true&utm_medium=email"
author:
  - "[[ByteByteGo]]"
published: 2026-06-15
created: 2026-06-16
description: "In this article, we will walk through how inference works and why the field’s optimization techniques exist."
tags:
  - "articles"
---
## FeatureOps Summit 2026 - Feature management in the AI Era (Sponsored)

![[https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd7fe5105-3674-489a-ba00-e9e871fe1b21_1200x1200.png]]

Speed without control is a false economy. As AI code-generation accelerates software delivery, the FeatureOps Summit 2026 is here to ensure that when we ship more, we break less.This premier virtual event brings together engineers, architects, and product leaders from companies like Wayfair, Visa, Mintlify, Lloyds, and many others, to explore the infrastructure of fearless delivery.  
缺少控制的速度只是虚假的经济性。随着 AI 代码生成加速软件交付，FeatureOps Summit 2026 关注如何在提升交付量的同时减少故障。这个顶级虚拟活动将汇集来自 Wayfair、Visa、Mintlify、Lloyds 等公司的工程师、架构师和产品领导者，共同探讨可靠交付的基础设施。

**Key Themes:** 主要主题：

**AI Safety Nets:** Guardrails for the flood of automated code.  
AI 安全网：为自动化代码的洪流设置护栏。  
**Edge Resilience:** Sub-millisecond evaluation at scale.  
边缘弹性：大规模亚毫秒级评估。  
**Continuous Flow:** Moving past the “fixed-release” mindset. Register today to master the tools and patterns required for a fail-safe release environment.  
持续流动：超越“固定发布”思维。立即注册，掌握构建安全可靠发布环境所需的工具和模式。

---

Every time an LLM generates a response, two operations run in sequence on the same GPU. The first processes the input prompt and emits a single token. The second produces every token after that, one at a time.  
每次 LLM 生成响应时，同一 GPU 上会依次运行两个操作。第一个操作处理输入提示，并生成一个词元。第二个操作再逐个生成后续词元。

From the outside, they look like stages of one process. However, inside the hardware, they have opposite bottlenecks. One is limited by raw compute. The other is limited by how fast data moves through memory. Most of the engineering work that makes production AI systems fast exists because of this split, and the techniques used to handle it are what inference engineering is built around.  
从外部看，它们像同一流程的两个阶段。但在硬件内部，它们的瓶颈方向相反：一个受原始算力限制，另一个受数据通过内存移动的速度限制。生产 AI 系统的大部分性能工程都源于这个拆分，推理工程也围绕处理这个拆分展开。

Inference engineering is the discipline of running trained AI models in production efficiently. The work spans low-level GPU code, model serving frameworks, and the cloud infrastructure that ties them together. Engineers in this field optimize for some combination of latency, throughput, cost, and quality, with the specific mix depending on the product they support. A few years ago, this work happened almost entirely inside frontier AI labs. Today, it has become a broad specialty that any company running serious AI workloads invests in.  
推理工程是在生产环境中高效运行已训练 AI 模型的学科。这项工作覆盖底层 GPU 代码、模型服务框架，以及连接它们的云基础设施。这个领域的工程师会根据产品需求，在延迟、吞吐量、成本和质量之间做组合优化。几年前，这项工作几乎只发生在前沿 AI 实验室内部。如今，它已经成为运行重要 AI 工作负载的公司会投入的通用专业方向。

In this article, we will walk through how inference works and why the field’s optimization techniques exist.  
在本文中，我们将介绍推理的工作原理以及该领域优化技术存在的原因。

*Disclaimer: This post is based on publicly shared* details *from various sources. Please comment if you notice any inaccuracies.*  
免责声明：本文基于从各种来源公开共享的详细信息。如果您发现任何不准确之处，请评论。

## The Rise of Inference Engineering

推理工程的兴起

Three years ago, inference engineering was a specialty practiced almost entirely inside frontier AI labs. The work concerned a small group of engineers building closed models that the rest of the industry consumed through APIs. That picture has shifted dramatically since 2024.  
三年前，推理工程几乎完全是前沿 AI 实验室内部实践的专长。这项工作涉及一小群工程师构建封闭模型，而整个行业通过 API 消费这些模型。自 2024 年以来，这幅图景发生了巨大变化。

Open models drove the change. Hugging Face, the public registry for AI models, now hosts well over two million open models, roughly 25 times what existed five years ago. Open releases like DeepSeek V3 have closed the capability gap with closed models, giving companies a real choice between paying for a closed API and running an open model themselves.  
开放模型推动了这一变革。作为 AI 模型的公共注册中心，Hugging Face 如今托管了超过两百万个开放模型，大约是五年前的 25 倍。像 DeepSeek V3 这样的开放模型发布已经缩小了与封闭模型的能力差距，为企业提供了在支付封闭 API 费用和自行运行开放模型之间的真实选择。

Self-hosting open models brings three operational advantages over closed APIs:  
自行托管开放模型相较于封闭 API 有三个运营优势：

- Latency profiles can be tuned for the workload pattern of a specific product, where public APIs optimize for general throughput across many customers.  
	延迟表现可以根据特定产品的负载模式进行调整，而公共 API 通常面向许多客户的通用吞吐量优化。
- Uptime can reach four nines or better with dedicated deployments, comparing favorably to the two nines typical of public APIs.  
	专用部署可以让可用性达到四个 9 或更高，优于公共 API 常见的两个 9。
- Costs typically drop by around 80 percent at scale once volume justifies the engineering investment.  
	当调用量足以支撑工程投入后，规模化成本通常会下降约 80%。

The result is that companies across many categories now build serious inference stacks, including AI-native startups, established products integrating AI into existing workflows, and even traditionally cautious sectors like healthcare.  
结果是，许多类型的公司都开始构建成熟的推理栈，包括 AI 原生初创公司、将 AI 集成到现有工作流的成熟产品，甚至医疗保健这类传统上较谨慎的行业。

Cursor offers a representative example. The team built Composer 2.0 on top of an open model, applying extensive inference engineering to deliver autocomplete latency below what closed APIs offer.  
Cursor 提供了一个有代表性的例子。团队在开放模型之上构建了 Composer 2.0，通过大量推理工程投入，实现了低于封闭 API 的自动补全延迟。

## The Two Phases of LLM inference

LLM 推理的两个阶段

Understanding why inference engineering looks the way it does starts with understanding what actually happens when a prompt arrives at an LLM. The process splits into two phases with very different physical demands on the GPU.  
理解推理工程为何呈现当前形态，始于理解当提示到达大型语言模型（LLM）时实际发生的情况。该过程分为两个阶段，对 GPU 的物理需求差异很大。

A token is the atomic unit that an LLM works with. Roughly, it is a word or word fragment. The word “inference” might be one token, while “engineering” might break into two. Latency metrics that mention tokens per second are counted in this unit.  
词元是 LLM 工作的基本单元。大致而言，它是一个单词或单词片段。英文单词 “inference” 可能是一个词元，而 “engineering” 可能拆成两个。每秒词元数这类延迟指标就是按这个单位计算的。

The first phase is called prefill.  
第一阶段称为 prefill（预填充）。

The model takes the entire input prompt and runs it through every layer of weights in parallel. Two outputs come out of this burst, namely the first token of the response and the KV cache, which is a structure that stores intermediate values from the attention mechanism so they can be referenced as more tokens get generated.  
模型将整个输入提示并行通过每一层权重。这次计算会产生两个输出：响应的第一个词元，以及 KV cache（KV 缓存）。KV cache 存储注意力机制的中间值，后续词元生成时可以继续引用。

Prefill is compute-bound. The GPU’s math units are the limiting factor because every input token gets processed simultaneously through every layer of the model, and throwing more raw computational power at this phase makes it faster. The metric that captures prefill performance is time to first token, or TTFT. That brief pause between sending a prompt to ChatGPT and seeing the first tokens appear is prefill in action.  
Prefill（预填充）是计算受限（compute-bound）的阶段。GPU 的数学计算单元是瓶颈，因为每个输入词元会同时通过模型的每一层处理，在这个阶段投入更多原始算力可以加快速度。衡量 prefill 性能的指标是首次词元时间（Time to First Token, TTFT）。从发送提示到看到第一个词元出现之间的短暂停顿，就是 prefill 在起作用。

The second phase is the decode phase. The model generates each subsequent token one at a time, running a full forward pass through every layer of weights for every token. Each new token depends on every token before it, which makes the process fundamentally sequential, and the GPU does this thousands of times for a long response.  
第二阶段是 decode（解码）阶段。模型逐个生成后续词元，并为每个词元通过所有层权重执行一次完整的前向传播。每个新词元都依赖于之前的所有词元，因此这个过程本质上是顺序的；对于长响应，GPU 会执行数千次这样的操作。

Decode is memory-bandwidth-bound. Math throughput sits mostly idle while the GPU spends its cycles reading model weights from memory for each forward pass, with the bottleneck living in data movement rather than arithmetic. The metric that captures decode performance is tokens per second, or TPS. The streaming pace of a long response is the decode phase at work.

![[https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8b8d857b-1ce9-4f39-93b5-67fcb663b2d4_1970x1246.png]]

Since prefill and decode have opposite bottlenecks, a technique that accelerates one phase often has minimal impact on the other. This is why benchmarks report TTFT and TPS as separate numbers, with performance on each phase measured independently.

This split is also the structural insight that organizes the rest of inference engineering. Once prefill and decode are understood as two distinct operations, the field’s techniques sort themselves into three groups: those that accelerate prefill, those that accelerate decode, and those that rebalance the two against each other.

The picture above is somewhat simplified. Real inference engines run batching, scheduling, and other complexity layered on top, and the prefill-decode split holds underneath all of it, which is why it serves as the foundation for the rest of this article.

## Optimization Techniques

With the prefill-decode split in mind, the major techniques in inference engineering become much easier to organize. Each one accelerates a specific phase, attacks both for different reasons, or restructures the system around the split itself.

Let us cover each of the six techniques in detail.

### Batching

Batching is the most basic way to scale a single GPU’s output. The inference engine weaves multiple requests together, token by token, so one GPU can serve many users at once. Throughput rises significantly because the GPU’s compute capacity gets fully utilized instead of sitting idle between requests.

The cost is paid in per-user latency.

A single user on an unbatched system gets the lowest possible response time, while the same user on a heavily batched system waits longer because the GPU is also serving other requests. This trade-off is the primary tension that every other technique navigates around, and different products land at different points on the spectrum, with consumer chat tools favoring lower latency and batch processing pipelines favoring higher throughput.

![[https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a9cf704-cfea-4b7f-8b4c-6c3554ea184a_1856x1096.png]]

### Prefix Caching

Prefix caching accelerates prefill by reusing KV cache values across requests. When two prompts share an opening segment, like a long system prompt that is identical across thousands of requests, the engine computes that prefix once and reads from cache thereafter. This is why API providers charge less for cached input tokens.

The catch is that the cache helps from the start of the sequence up to the first non-matching token. If the very first token differs between two prompts, prefix caching delivers zero savings even when the rest of the sequence is identical. Therefore, prompt structure has direct cost and latency implications, and putting variable user input late in the prompt while keeping shared content early gives the cache something to work with.

![[https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb87de856-3775-4ada-b41b-4c99125f3a7e_2220x1096.png]]

### Quantization

Quantization helps both phases of inference, though for different reasons.

The basic move is storing model weights in a lower-precision number format. Most modern models train in 16-bit floating-point, and quantization compresses those values down to 8-bit or 4-bit representations, which means smaller weights occupying less memory and requiring less data movement.

Prefill speeds up because lower-precision math operations run faster on the specialized math units inside modern GPUs. Decode speeds up because reduced memory bandwidth pressure means weights are loaded from memory more quickly per forward pass. A typical step down in precision yields roughly 30 to 50 percent better performance, with the exact gain depending on the model and the technique applied.

The cost is potential quality degradation, and different parts of a model tolerate quantization differently.

Linear weights handle it well, activations are somewhat more sensitive, the KV cache is more sensitive still, and attention layers are the most sensitive of all. The reason is that small precision errors in attention layers compound across the sequence of tokens, with each token’s calculation building on the previous ones, so even small errors snowball into meaningful quality loss over a long response.

Most production setups leave attention at full precision for this reason. The bulk of the engineering work in quantization comes down to figuring out which parts to compress and how aggressively.

![[https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffbba455a-53ba-455f-9086-0f0d9e13346a_1970x1196.png]]

### Speculative Decoding

Speculative decoding accelerates the decode process by exploiting an asymmetry. Generating a token from scratch is expensive, while verifying whether a candidate token matches what the main model would produce is much cheaper. The Sudoku analogy works here, where solving the puzzle takes effort, while checking a finished puzzle is fast.

In speculative decoding, a smaller draft model predicts the next several tokens, and the main model verifies all of them in a single forward pass, accepting the ones that match its own predictions and rejecting the rest. The result is multiple tokens emerging per forward pass through the main model, where one would normally appear.

Speculative decoding improves TPS while leaving TTFT unchanged, because prefill still runs normally. The technique also works best at smaller batch sizes, when the GPU has spare compute capacity to spend on verification. At larger batch sizes, when many requests are being served at once, the GPU is already saturated, and speculation gets dynamically disabled because every cycle is needed for the main workload.

![[https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc7a4980d-059e-4337-a525-e3800ffe57cd_1540x1228.png]]

### Parallelism

Parallelism techniques let large models run across multiple GPUs when a single one falls short, either because the model is too big to fit in memory or because single-GPU latency is too high. Two main approaches dominate the open model landscape: tensor parallelism and expert parallelism.

Tensor parallelism splits each layer of the model across multiple GPUs. Every GPU holds a fragment of every layer, and the GPUs share the work for each forward pass. This requires high-bandwidth interconnects between the GPUs, like NVIDIA’s NVLink, because results need to be combined after every layer. Tensor parallelism is the default choice for serving very large dense models, where the bandwidth-hungry communication is offset by the speedup from sharing per-layer work.

Expert parallelism applies specifically to mixture-of-experts models, where only a subset of the model’s parameters activate for each token. Different experts get distributed across different GPUs, and tokens get routed to whichever experts they need. The communication overhead is lower than tensor parallelism because experts operate independently, which makes expert parallelism well-suited for multi-node deployments where bandwidth is more limited. Most production deployments combine both, using tensor parallelism within a node and expert parallelism across nodes.

![[https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f1d8e3a-4d25-4c1a-b925-7d022891fa30_1970x1436.png]]

### Disaggregation

Disaggregation takes the prefill-decode split literally. The idea is to run prefill on one set of GPUs and decode on another, with the KV cache shipped between them over the network. Each set uses hardware tuned to its specific bottleneck, and each set scales independently based on its own traffic pattern.

The flow becomes a three-step process:

- The prefill engine takes the input sequence and produces both the first token and the KV cache.
- The cache gets sent over a fast interconnect to the decode engine, and the decode engine handles every subsequent token.
- In conditional disaggregation, short or already-cached requests skip the handoff entirely and run on the decode engine alone, which performs better against real-world traffic that includes a mix of long and short prompts.

Disaggregation is the most architectural of the techniques covered here. It treats prefill and decode as separate services with separate operational concerns, giving operators independent levers to scale each one. Companies running large-scale inference often consider this a near-mandatory step once their workload mix is well understood.

![[https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5cda55a4-3e8b-4095-9b61-7382ba00c1c3_2220x1164.png]]

## When to Invest in Inference Engineering

Putting these techniques into production is a serious task, and combining them adds further complexity. The question every engineering team has to answer is whether to take on this work or whether off-the-shelf APIs are still the right choice. The answer depends on the stage of the product.

Early in building an AI product, off-the-shelf APIs from established providers are almost always the right choice. Meaningful optimization requires real constraints to work against, and early-stage products tend to have fuzzy assumptions about traffic patterns, latency requirements, and unit economics. Engineering effort at this stage is better spent shipping product, since the complexity of running a custom inference stack slows down iteration when iteration speed is what actually matters.

Three signals usually indicate the equation has shifted:

- API costs have grown into a meaningful expense line.
- Latency requirements have moved past what closed APIs can deliver.
- Reliability needs have started to exceed what vendor SLAs offer.

Cursor handled this transition well. Sub-second autocomplete latency was the product itself, and closed APIs aim for general throughput across many customers, while a code completion model demands a specific shape of speed. Self-hosting an open model and applying inference engineering across the stack made the latency target reachable, and the investment paid back because the constraints were real and the workload was well understood.

## Conclusion

LLM inference is two operations with opposite physical constraints.

Prefill is compute-bound and runs once per request. Decode is memory-bandwidth-bound and runs once per token. Most of the techniques in inference engineering exist because of this split, and grasping it makes the rest of the field much easier to navigate.

Each technique covered above fits into the prefill-decode framework:

- Batching trades per-user latency for total throughput.
- Prefix caching cuts prefill work when prompts share opening segments.
- Quantization compresses model weights to help both phases.
- Speculative decoding squeezes more tokens out of decode by exploiting idle compute.
- Parallelism scales models across multiple GPUs.
- Disaggregation runs prefill and decode on separate hardware altogether.

Layered on top of all this is the build-versus-buy question. Off-the-shelf APIs remain the right choice for most products in their early stages, while self-hosting starts to make sense when API costs grow into a real expense line, when latency requirements outgrow what closed APIs can deliver, or when reliability needs exceed vendor SLAs.

**References:**

- [Hugging Face Hub Documentation](https://huggingface.co/docs/hub/index)
- [DeepSeek-V3 Technical Report](https://arxiv.org/abs/2412.19437)
- [Cursor — Composer: Building a fast frontier model with RL](https://cursor.com/blog/composer)
- [Cursor — Introducing Composer 2](https://cursor.com/blog/composer-2)
- [DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving](https://arxiv.org/abs/2401.09670)
- [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)
- [Anthropic — Prompt Caching Documentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- [NVIDIA TensorRT Documentation](https://developer.nvidia.com/tensorrt)
- [Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192)
- [Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism](https://arxiv.org/abs/1909.08053)
- [NVIDIA Megatron-Core Developer Guide — Tensor Parallel](https://docs.nvidia.com/megatron-core/developer-guide/latest/api-guide/tensor_parallel.html)
- [Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer](https://arxiv.org/abs/1701.06538)
- [NVIDIA NVLink and NVLink Switch](https://www.nvidia.com/en-us/data-center/nvlink/)
- [Anthropic Claude API Documentation](https://docs.anthropic.com/)
