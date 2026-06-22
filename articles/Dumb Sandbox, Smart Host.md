---
title: "Dumb Sandbox, Smart Host"
source: "https://x.com/intuitiveml/status/2066982286395068540"
author:
  - "[[@intuitiveml]]"
published: 2026-06-17
created: 2026-06-22
description: "Most cloud agent architectures start by asking what the sandbox can do. Can it run shell commands? Can it install pack..."
tags:
  - "articles"
---
![[Image 9.jpg|Image]]

Most cloud agent architectures start by asking what the sandbox can do.

大多数云智能体架构都是从询问沙盒能做什么开始的。

Can it run shell commands? Can it install packages? Can it call APIs? Can it persist files? Can it make LLM calls? Can it recover after a crash?

它能运行 shell 命令吗？它能安装软件包吗？它能调用 API 吗？它能持久化文件吗？它能发起 LLM 调用吗？它能在崩溃后恢复吗？

After building this layer for a while, I think the better question is the opposite:

在构建这一层一段时间后，我认为更好的问题方向相反：

What should the sandbox never be trusted to do?

沙盒永远不该被信任去做什么？

A desktop agent collapses everything into one boundary. The user, machine, filesystem, credentials, runtime, and process all live together. The agent can read local files, use local environment variables, call APIs directly, and rely on the user to retry when something breaks.

桌面智能体把所有东西折叠进同一个边界：用户、机器、文件系统、凭证、运行时和进程都在一起。智能体可以读取本地文件，使用本地环境变量，直接调用 API，并依赖用户在出错后重试。

A cloud agent does not get that simplicity.

云智能体没有这种简单性。

It runs on shared infrastructure. It executes code written by an LLM. It may be triggered by a human, a cron schedule, an API call, or another agent. The user may not be present. The prompt may be adversarial. The code inside the execution environment may already be compromised.

它运行在共享基础设施上，执行由 LLM 写出的代码。它可能由人、cron 定时任务、API 调用或另一个智能体触发。用户可能不在场，提示词可能带有对抗性，执行环境中的代码也可能已经被攻陷。

That changes the architecture. The rule we landed on is simple: The host is smart. The sandbox is dumb.

这会改变架构。我们最终采用的规则很简单：主机是智能的，沙盒是简单的。

![[Image 10.jpg|Image]]

The host is the trusted, long-lived control plane. It owns identity, secrets, billing, persistence, retries, policy, observability, and the truth-of-record for the run.

主机是可信、长寿命的控制平面（control plane）。它掌管身份、密钥、计费、持久化、重试、策略、可观察性，以及一次运行的权威记录。

The sandbox is the disposable execution boundary. It runs model-chosen code and shell commands. It can create files. It can call tools through narrow channels. But it does not hold long-lived credentials, does not write business state directly, does not decide billing, and does not call internal services as itself.

沙盒是可丢弃的执行边界。它运行模型选择的代码和 shell 命令。它可以创建文件，也可以通过狭窄通道调用工具。但它不持有长期凭证，不直接写入业务状态，不决定计费，也不以自己的身份调用内部服务。

This split sounds obvious after the fact. It is not obvious while building.

事后看来，这种拆分很明显。构建过程中，它并不明显。

The tempting design is to make the sandbox smarter every time a new feature needs something. If the agent needs Slack, give the sandbox a Slack token. If it needs persistence, let it write to the database. If it needs billing, deduct credits from inside the runner. If it needs to call an internal API, give it a service URL and a secret.

诱人的设计，是每当新功能需要某种能力时就让沙盒更智能。如果智能体需要 Slack，就给沙盒一个 Slack token；如果它需要持久化，就让它写数据库；如果它需要计费，就在 runner 内部扣减 credit；如果它需要调用内部 API，就给它服务 URL 和密钥。

Each decision feels locally convenient. Together, they turn an untrusted execution environment into the most privileged part of the system.

每个决定在局部都很方便。合在一起，它们会把不可信执行环境变成系统中权限最高的部分。

That is backwards.

这是方向倒置。

A sandbox should be powerful in one dimension only: execution. It can run the code the model chooses. Everything else should be mediated by the host.

沙盒只应该在一个维度上强大：执行。它可以运行模型选择的代码。其他所有事情都应该由主机调解。

When the agent needs to call an authenticated service, the sandbox does not receive the OAuth token. It sends a request through a bridge. The host validates that the request belongs to the current run, checks policy, attaches the real credential server-side, forwards the call, records what happened, and returns only the response.

当智能体需要调用已认证服务时，沙盒不会收到 OAuth token。它通过桥接层发送请求。主机验证该请求属于当前运行，检查策略，在服务端附加真实凭证，转发调用，记录发生了什么，并且只返回响应。

When the agent needs to persist output, the sandbox does not become the database client. It emits structured events or writes artifacts that the host chooses to store. If the sandbox disappears halfway through the run, the durable record still lives outside it.

当智能体需要持久化输出时，沙盒不会变成数据库客户端。它发出结构化事件，或写入由主机选择保存的工件。即使沙盒在运行中途消失，持久记录仍然存在于沙盒之外。

When the agent needs to spend money, the sandbox does not charge itself. The host sees the call, applies rate limits, deducts credits, and logs the decision. Any accounting system that depends on untrusted code voluntarily reporting its own usage will eventually be wrong.

当智能体需要花钱时，沙盒不会自己完成扣费。主机看到调用，应用速率限制，扣减 credit，并记录决策。任何依赖不可信代码主动上报自身用量的计费系统，最终都会出错。

![[Image 11.jpg|Image]]

The same pattern applies to observability. Logs trapped inside the sandbox are useful for debugging, but they are not the system of record. The host needs to see every meaningful boundary crossing: tool calls, generated artifacts, user-visible events, credit deductions, retries, failures, and final state.

同样的模式也适用于可观察性。困在沙盒内部的日志对调试有用，但它们不是系统记录。主机需要看到每一次有意义的边界跨越：工具调用、生成工件、用户可见事件、credit 扣减、重试、失败和最终状态。

The sandbox can still have limited intelligence. It can run helper scripts, call local tools, use MCP servers, and make LLM calls when needed. But those LLM calls should go through a gateway with scoped, short-lived credentials. The sandbox should never see the real provider keys.

沙盒仍然可以拥有有限智能。它可以运行辅助脚本、调用本地工具、使用 MCP 服务器，并在需要时发起 LLM 调用。但这些 LLM 调用应该通过带有作用域、短期凭证的网关。沙盒永远不应该看到真实的服务商密钥。

The boundary is the product.

边界本身就是产品。

A good cloud agent runtime has a narrow interface between host and sandbox. The sandbox can ask. The host decides.

一个好的云智能体运行时，在主机和沙盒之间有狭窄接口。沙盒可以请求，主机负责决定。

That interface usually looks boring: stdout markers, bridge calls, scoped tokens, expiring credentials, structured events. Boring is good. Boring means auditable. Boring means replayable. Boring means you can reason about what happens when the sandbox is compromised.

这个接口通常看起来很平淡：stdout markers、桥接调用、作用域 token、会过期的凭证、结构化事件。平淡是好事。平淡意味着可审计、可重放，也意味着你能推理沙盒被攻陷后会发生什么。

The failure case is the design test.

失败场景就是设计测试。

If prompt injection convinces the agent to dump its environment, what leaks?

如果提示注入诱导智能体导出执行环境，会泄露什么？

In the smart-host, dumb-sandbox model, the answer should be: no long-lived provider keys, no database credentials, no user OAuth tokens, no internal service secrets. At worst, the attacker gets scoped credentials that only work for this run, from this environment, for a short window.

在智能主机、简单沙盒模型中，答案应该是：没有长期服务商密钥，没有数据库凭证，没有用户 OAuth token，没有内部服务密钥。最坏情况下，攻击者拿到的是作用域受限的凭证，只能在这次运行、这个环境和短时间窗口内使用。

If the sandbox crashes, what is lost?

如果沙盒崩溃，会丢失什么？

Scratch files, maybe. In-progress execution, probably. But not the user’s identity, not billing state, not the durable event log, not the platform’s ability to retry or explain what happened.

也许会丢失临时文件，也大概率会丢失进行中的执行。但用户身份、计费状态、持久事件日志、平台重试和解释运行过程的能力仍然保留。

That is the point of keeping the sandbox dumb. Not because it does nothing, but because it is replaceable.

这就是保持沙盒简单的目的。它并非什么都不做；它是可替换的执行边界。

![[Image 12.jpg|Image]]

A cloud agent is not a VM with some AI inside. It is a trusted host coordinating an untrusted executor.

云智能体不是一个塞进 AI 的虚拟机。它是由可信主机协调不可信执行器。

The user’s intent belongs to the host. The execution belongs to the sandbox. Secrets, billing, persistence, and policy belong outside the blast radius. Once you draw that line, new features get easier to place.

用户意图属于主机，执行属于沙盒。密钥、计费、持久化和策略应该位于影响半径之外。一旦画出这条边界，新功能就更容易归位。

Does it need a secret? Host.

它需要秘密吗？主机。

Does it need a durable state? Host.

它需要持久的状态吗？主机。

Does it decide whether a user is allowed to do something? Host.

它决定用户是否允许执行某操作吗？主机。

Does it execute agent-written code? Sandbox.

它执行代理编写的代码吗？沙盒。

Does it need to cross back into the product? Bridge.

它需要跨回产品吗？桥梁。

The architecture becomes less about adding capabilities to the sandbox and more about designing the channels around it.

架构重点从给沙盒增加能力，转向围绕沙盒设计通道。

That is what makes cloud agents safe to run unattended. Not a smarter sandbox, but a dumber one with a smarter host around it.

这正是云智能体能够在无人值守时安全运行的原因：一个更简单的沙盒，配上一个更智能的主机。
