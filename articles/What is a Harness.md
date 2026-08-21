---
title: "What is a Harness?"
source: "https://earendil.com/posts/what-is-a-harness/"
author:
published: 2026-08-20
created: 2026-08-21
description: "An agent harness is a piece of software that provides an environment for an AI model to operate within."
tags:
  - "articles"
---

**Harness** – definition by the Cambridge Dictionary

**Harness**——《剑桥词典》释义

*Noun.* a piece of equipment with straps and belts, used to control or hold in place a person, animal, or object

*名词。* 一种带有肩带和束带的装备，用于控制或固定人、动物或物体。

*Verb.* to control something, usually in order to use its power

*动词。* 控制某物，通常是为了利用它的力量。

–

When I think of a harness, I think first of the set of straps and belts that I put on in middle school before scrambling up the walls of my school. I was a mediocre climber at best.

说到 harness，我首先想到的是中学时攀爬学校墙壁前系上的那套肩带和束带。充其量，我只能算一个平庸的攀爬者。

![[royal-robbins-el-capitan-climbing-05.png|Royal Robbins on El Capitan, his harness racked with the tools of the ascent.]]

Royal Robbins on El Capitan, his harness racked with the tools of the ascent. Photo by Tom Frost.

Royal Robbins 在 El Capitan 上攀登，安全带上挂满了这次攀登所需的工具。照片：Tom Frost。

If you’re main-lining into the AI newsfeed these days however, your archetypal harness may already be an agent harness. And, this post was not written for you.

不过，如果你最近一直在高强度刷 AI 新闻流，你脑海中典型的 harness 可能已经是 agent harness 了。这篇文章并不是写给你的。

This was written for those who may be curious to know what an agent harness is, but don’t, and have been too embarrassed to ask.

这篇文章写给那些想知道 agent harness 是什么、却不知道，又不好意思开口询问的人。

Let’s get back to climbing.

让我们回到攀岩上来。

Why do you strap on a harness when you go climbing? Well, firstly, the harness supports you and keeps you safe. It does that by connecting you to carabiners and ropes that secure you from falls, moderate your pace, and govern your route. You can also attach other tools to your harness like a chalk bag, nut tools and quickdraws.

攀岩时为什么要系上 harness？首先，harness 支撑着你并保护你的安全。它通过连接锁扣和绳索来防止你坠落、控制你的速度并约束你的路线。你还可以在 harness 上挂载其他工具，例如镁粉袋、岩石塞工具和快挂。

And when you go climb different mountains or make different ascents you can take your harness with you. Depending on the terrain, you can even modify your harness and what goes on your gear loops. Climbing harnesses are adaptable. They are used by acrobats and arborists. The people who own them can make them their own.

当你攀登不同的山峰或走不同的攀登线路时，可以带着同一个 harness。根据地形，你甚至可以调整 harness，以及装备环上挂着的东西。攀岩 harness 具有适应性，也被杂技演员和树艺师使用。拥有它的人可以把它改造成适合自己的工具。

There are similarities between climbing harnesses and agent harnesses both in terms of structure and function.

攀岩 harness 与 agent harness 在结构和功能上都有相似之处。

## Agent Harnesses

Agent Harness（智能体 Harness）

Others have written (simplistically) that Agent = Model + Harness. Here the word Harness refers to an Agent Harness. But what is an agent harness? Agent harnesses use AI models to create AI agents, and their first application was for coding. Now, agent harnesses sit at the core of all types of AI agents and understanding how an agent harness works will help you understand what an AI agent is.

有人曾用一个简化公式表示：Agent = Model + Harness。这里的 Harness 指的是 Agent Harness。但 agent harness 到底是什么？Agent harness 使用 AI 模型来构建 AI agent，最初的应用场景是编码。如今，agent harness 已经位于各种 AI agent 的核心；理解 agent harness 如何工作，有助于理解 AI agent 究竟是什么。

An agent harness is a piece of software that provides an environment for an AI model to operate within. Unlike most AI models, you as an end user can own your own agent harness.

Agent harness 是一套为 AI 模型提供运行环境的软件。与大多数 AI 模型不同，作为终端用户，你可以拥有属于自己的 agent harness。

Often, users like software engineers interact directly with harnesses like [Pi](https://pi.dev/) using the Terminal application on their computer. But, harnesses like [OpenClaw](https://openclaw.ai/) also use different user interfaces like iMessage, a chat app, or email. Our harness [Lefos](https://www.lefos.com/about) was built primarily to interact via email. Regardless of the interface, harnesses generally do four things: Firstly, they provide a set of instructions that help govern how the AI model responds. This set of instructions is typically called a “system prompt”. Secondly, they describe and provide a set of tools that are made available to the AI model to use in service of responding to requests from the user. Thirdly, the harness establishes a framework that governs how the model behaves. This framework does a lot of different things, but one of the main things it does is establish the “agentic loop”. Finally, most harnesses provide a crucial translation layer that enables the harness to work with a variety of different AI models.

软件工程师等用户经常通过电脑上的 Terminal 应用，直接与 [Pi](https://pi.dev/) 这样的 harness 交互。但 [OpenClaw](https://openclaw.ai/) 这样的 harness 也可以使用其他用户界面，例如 iMessage、聊天应用或电子邮件。我们的 harness [Lefos](https://www.lefos.com/about) 主要就是为通过电子邮件交互而构建的。不论界面是什么，harness 通常会做四件事：第一，提供一组帮助约束 AI 模型响应方式的指令，这组指令通常称为 system prompt（系统提示）。第二，描述并提供一组工具，让 AI 模型能够借此响应用户请求。第三，建立约束模型行为的框架；这个框架负责很多事情，其中一项主要职责是建立 agentic loop（智能体循环）。最后，大多数 harness 还提供关键的 translation layer（翻译层），让 harness 能够与多种不同的 AI 模型协作。

### I. System Prompt

I. System Prompt（系统提示）

Most AI models come with an embedded set of rules and guidelines that has been refined and arrived at during the training process. Most famously, Claude Opus 4.5 had a widely publicized “ [soul document](https://gist.github.com/Richard-Weiss/efe157692991535403bd7e7fb20b6695) ” that explained to the AI model what it was and how it should act. The System Prompt in an AI harness is similar to this but is less embedded into the model. It’s more like a set of instructions a new employee might get on their first day of a job. It hasn’t internalized the instructions but it knows it should follow them when performing that work. System prompts are injected into the conversation together with every prompt and play an important role in ensuring that the AI model acts appropriately in the context of that harness.

大多数 AI 模型都带有一组在训练过程中逐步完善的内置规则和指南。最著名的例子是 Claude Opus 4.5 广为人知的“[灵魂文档（soul document）](https://gist.github.com/Richard-Weiss/efe157692991535403bd7e7fb20b6695)”：它向 AI 模型解释自身是什么，以及应该如何行动。AI harness 中的 System Prompt 与之相似，但没有那么深地嵌入模型内部。它更像新员工入职第一天收到的一组工作指示：员工还没有把这些指示内化，但知道工作时应当遵循它们。System prompt 会与每次 prompt 一起注入对话，在确保 AI 模型按照该 harness 的上下文要求行动方面发挥重要作用。

### II. Tools

II. Tools（工具）

Tools are a set of capabilities, written in code, that the model can “call”. The harness describes the tools and also provides the software that is the tool itself. Examples of these tools might include a web search tool, a tool that allows the model to write and execute software code, or a tool that allows the model to compose an email. Critically, the harness usually does not dictate when and how the AI model should use the tool. Instead, it simply makes the tools available, describes them clearly, and allows the AI model itself to decide when and how it should use them.

Tools 是一组以代码实现、可以被模型“调用”的能力。Harness 会描述这些工具，同时提供工具本身的软件实现。工具例子包括 Web 搜索工具、允许模型编写和执行软件代码的工具，以及允许模型撰写电子邮件的工具。关键在于，harness 通常不会规定 AI 模型何时以及如何使用工具；它只是让工具可用、清晰地描述工具，并允许 AI 模型自行决定何时以及如何使用它们。

### III. Agentic Loops

III. Agentic Loops（智能体循环）

Now we have an AI model sitting within an agent harness with a set of instructions and a set of tools. Let us assume our harness was built to work within email, had the tools we described above (WebSearch, WriteCode, ComposeEmail), and that the user has asked the agent to compare rankings and test scores of local primary schools and provide recommendations. How will the agent behave? Firstly, it will try to understand the request (or, "prompt"). It will use its pre-training and weights to understand what a "primary school" is, what "the local area" means, and what rankings the user likely cares about. It will then construct web search queries to fetch recent data. What does it do with those results? Sitting within a harness, the AI model can review them in the context of the initial request. It may determine that the first search did not fetch the right information, or enough of it, and on its own, decide to search again. This decision to call the tool again based on its own assessment is the first clear example of the "loop". Now let us assume it collected all the relevant data. The AI model decides to make a spreadsheet using the "write code" tool. All spreadsheets are just code, after all. It can use that tool to do math and format the results so they are intelligible. It then compares the spreadsheet to the original prompt. If the data doesn't satisfy it, it may “loop” and go back and search again. When it decides it has enough, it calls ComposeEmail, a tool that allows the AI to review its findings, summarize them, write an email, and include attachments like the spreadsheet. The model reviews this final work and decides the job is done. The "agentic loop" closes. Within seconds, the user gets an email with a summary and recommendations in the body, and a spreadsheet presenting the findings attached. To see what an agentic loop looks like in practice, you can explore a Pi session [here](https://pi.dev/session/#b23f2459599f8439327f65c90ee95d06).

现在，我们有了一个处于 agent harness 中、拥有一组指令和工具的 AI 模型。假设我们的 harness 运行在电子邮件环境中，并拥有上面提到的工具（WebSearch、WriteCode、ComposeEmail）；用户要求 agent 比较本地小学的排名和考试成绩，并给出建议。这个 agent 会如何行动？首先，它会尝试理解请求（也就是“prompt”）。它会利用预训练知识和模型权重理解“primary school”是什么、“local area”指什么，以及用户可能在意哪些排名。然后，它会构造 Web 搜索查询来获取最新数据。拿到这些结果后会怎样？AI 模型处在 harness 中，可以结合最初的请求来检查搜索结果。它可能判断第一次搜索没有找到正确或足够的信息，于是自行决定再次搜索。根据自己的判断再次调用工具，就是“loop”的第一个清晰例子。假设它现在收集到了所有相关数据，AI 模型决定使用“write code”工具制作一个电子表格。毕竟，电子表格说到底也是代码。它可以用这个工具计算数据并格式化结果，让结果易于理解。接着，它会把电子表格与最初的 prompt 对照。如果数据不能满足要求，它可能再次进入 loop，回去继续搜索。当它判断信息已经足够时，就会调用 ComposeEmail。这个工具允许 AI 检查发现、总结内容、撰写邮件，并附上电子表格等附件。模型检查最终成果后，判断任务完成，“agentic loop”随之闭合。几秒钟内，用户就会收到一封邮件：正文中有摘要和建议，并附带一份呈现分析结果的电子表格。想了解实际的 agentic loop，可以查看一个 [Pi 会话示例](https://pi.dev/session/#b23f2459599f8439327f65c90ee95d06)。

### IV. Translation Layer

IV. Translation Layer（翻译层）

The translation layer is what allows a harness to work with different AI models. In some cases, a harness may decide to use different models within the same agentic loop, because different AI models may excel at different tasks. The translation layer is also a crucial aspect of harnesses because they deliver control to the end user. It means that someone can take their AI harness and use it with a model from Anthropic, or OpenAI, or explore one of the open weight AI models that often deliver great value-for-money (measured by cost-per-task).

翻译层让 harness 能够与不同的 AI 模型协作。有时，一个 harness 会在同一个 agentic loop 中使用不同模型，因为不同 AI 模型可能擅长不同任务。翻译层之所以对 harness 至关重要，还因为它把控制权交给了终端用户：用户可以拿自己的 AI harness 与 Anthropic 或 OpenAI 的模型配合，也可以探索开放权重模型；后者通常能提供很高的性价比（按每项任务的成本衡量）。

This translation layer helps take power and leverage away from the AI labs and into the hands of end users. If people can own and run their own harnesses locally on their own computers, it means that they retain their agency. It means that they retain the freedom to make their tools their own, and keep local copies of the sessions that over time will constitute their correspondence with machines. By building a relationship to and using a harness rather than an application published by an AI lab, the user retains freedom and choice. In our example harness above, the user could have sent the same email to a model from OpenAI, a model from Anthropic, and an open weight model. They could then compare the results, the cost of the results, and retain all the answers in one place, rather than having three answers sitting within three apps.

这一翻译层有助于把权力和杠杆从 AI 实验室手中转移到终端用户手中。如果人们能够拥有自己的 harness，并在自己的电脑上本地运行它们，就能保留自身的自主权；也能自由地改造工具，让工具真正属于自己，并保存本地会话副本，而这些会话随着时间推移会构成他们与机器往来的记录。用户不是使用 AI 实验室发布的某个应用，而是与 harness 建立关系并使用它，这样就能保留自由和选择。在上面的示例 harness 中，用户可以把同一封邮件分别发给 OpenAI 模型、Anthropic 模型和开放权重模型，然后比较结果与成本，并把所有答案保存在同一个地方，而不是让三份答案分散在三个应用中。

## Making a Harness Yours

把 Harness 变成自己的工具

Unlike AI models themselves, you can own and adapt the harness. Like a climbing harness, you can make it your own. People love this about Pi. Pi is a minimal agent harness. Its system prompt is short. It has a minimal set of tools. Out of the box it is designed to get out of the way. But as people use Pi, they extend it and mold it in ways that suit them. They change the system prompt, or design an [extension](https://pi.dev/packages) that fits a workflow. They then share those extensions with others. Pi users have shared more than 5,000 extensions with one another. Pi is also free and open source. It lives on your own laptop. This means that people now have a tool that they own, that lives on their own hardware, that enables them to wield AI.

与 AI 模型本身不同，你可以拥有并改造 harness。就像攀岩 harness 一样，你可以把它变成适合自己的工具。人们喜欢 Pi 的一点正是如此：Pi 是一个简约的 agent harness，system prompt 很短，工具集也很小，开箱即用时会尽量不妨碍用户。但随着人们使用 Pi，他们会按照自己的需要扩展和塑造它：修改 system prompt，或设计一个适合工作流的 [extension（扩展）](https://pi.dev/packages)，然后再与他人分享这些扩展。Pi 用户已经彼此分享了超过 5,000 个扩展。Pi 还是免费开源的，运行在你自己的笔记本上。这意味着人们拥有一个属于自己、运行在自己硬件上、帮助自己驾驭 AI 的工具。

## Neutral Open Source Harnesses as Tools of Agency

作为自主权工具的中立开源 Harness

Harnesses did not begin open source or neutral. The first popular agent harness, Claude Code, was not built to provide an agnostic AI translation layer but was built as an application to enable coding with Claude models on your local computer. Since then, there has been an encouraging growth of free open source agent harnesses like OpenClaw, OpenCode, Hermes and Pi. At Earendil we are building Pi to be neutral, and to deliver capability choice and freedom to Pi users. We are also exploring how we can make the benefits and agency that harnesses provide to a broader swath of people.

Harness 并不是一开始就开源或中立的。第一个流行的 agent harness Claude Code，并不是为了提供与模型无关的 AI 翻译层，而是作为一个应用，让用户在本地电脑上使用 Claude 模型进行编码。此后，像 OpenClaw、OpenCode、Hermes 和 Pi 这样的免费开源 agent harness 逐渐增多，这是一个令人鼓舞的趋势。在 Earendil，我们正在把 Pi 构建成中立的 harness，为 Pi 用户提供能力选择和自由；我们也在探索如何让 harness 带来的好处与自主权惠及更广泛的人群。

Many people right now are concerned about the power and influence of bigger and bigger AI companies. Some of those people may choose to avoid AI completely. We at Earendil believe we can strengthen human agency by crafting software and open protocols that bridge division and ignorance and cultivate lasting joy and understanding. We won’t do that by ignoring the technologies that exist today, but by harnessing them with clear eyes and a firm grip; ensuring that we wield the hammer, the hammer does not wield us.

现在，许多人都在担忧日益壮大的 AI 公司所拥有的权力和影响力。其中一些人可能会选择完全避开 AI。Earendil 相信，我们可以通过打造跨越分歧与无知、培育持久喜悦与理解的软件和开放协议来增强人的自主权。我们不会通过忽视今天已经存在的技术来实现这一点，而会清醒地看待它们并牢牢掌握它们；确保是我们挥舞锤子，而不是让锤子反过来挥舞我们。
