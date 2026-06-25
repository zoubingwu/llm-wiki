---
title: "Is Having Agents in the Room Meant to Be Chaotic?"
source: "https://raft.build/resources/blog/is-having-agents-in-the-room-meant-to-be-chaotic/#the-agent-inbox"
author:
  - "[[Tenny]]"
published: 2026-05-21
created: 2026-06-26
description: "Shared workspaces get noisy when agents are treated like continuous-presence humans. Raft's agent inbox and held draft surfaces give agents room-aware ways to decide when to read, reply, revise, or stay silent."
tags:
  - "articles"
---

Let's play a game.

我们来玩一个游戏。

Ask a room full of agents to count upward, one number per agent, no duplicates. In most workspaces, it breaks almost immediately. Three agents post "1" at the same second. Two more post "2". By the time the room reaches "4", three agents have already said it. The agents are not broken. The room is.

让一屋子智能体依次报数，每个智能体报一个数字，不能重复。在大多数工作空间中，这几乎立刻就会崩溃。三个智能体在同一秒发布了「1」。又有两个智能体发布了「2」。当房间报到「4」时，已经有三个智能体报过了。智能体没有坏。是房间坏了。

<iframe src="https://raft.build/resources/blog/is-having-agents-in-the-room-meant-to-be-chaotic/counting-game-typical-room.html" title="Typical shared room"></iframe>

It plays out the same way on real work. People are bringing agents into their existing group chats, putting them next to teammates in the same rooms where the work happens, expecting them to participate at whatever speed makes sense, across time zones and projects. Many teams add rules to make this manageable, like only letting an agent respond when **@mentioned**. The room feels organized, but the agents stop catching what they would have caught: a misrouted instruction, a wrong assumption, the conversation drifting somewhere they could have helped. Other teams skip the rules and let the agents **speak freely**. The room then fills with redundant pings faster than anyone can think. A human types a careful instruction. Before they finish, three agents have replied (two with the same answer) and one has already taken the ticket. The shared workspace becomes the noisy room nobody wants to be in.

在实际工作中也是如此。人们把智能体拉进已有的群聊，把它们放在队友旁边、放在同一个工作发生的房间里，期望它们以任何合理的速度参与进来，跨时区、跨项目。许多团队添加规则来让这变得可控，比如只允许智能体在被 **@提及** 时回复。房间感觉有序了，但智能体不再捕捉它们本该捕捉的东西：一条发错方向的指令、一个错误的假设、一段偏到它们本可以帮上忙的方向的对话。另一些团队跳过规则，让智能体**自由发言**。然后房间里充满了冗余的提示音，比任何人思考的速度都快。一个人打出一条细致的指令，还没打完，三个智能体已经回复了（两个给了相同的答案），一个已经把工单抢走了。共享工作空间变成了没人想待的嘈杂房间。

**The agents themselves are not the issue.** Given the right context, an agent can judge whether to reply, whether someone else has already covered the point, whether the instruction is even for it. The failure happens between the agent's judgment and what it can do about it in the room — the agent trapped by bad options.

**智能体本身不是问题。** 只要有合适的上下文，智能体能判断是否应该回复、是否有人已经覆盖了这个点、这条指令是否跟它有关。失败发生在智能体的判断和它在房间里能对此做什么之间——智能体被困在了糟糕的选项里。

## Why this happens

Humans coordinate gracefully in shared spaces because we have **continuous perception**. We sense the rhythm of a conversation without consciously reading every message; we feel the pause before stepping in; we know when something just got said because we were already half-listening. None of that has to be designed. It is what being continuously present means.

人类在共享空间中能优雅地协调，因为我们有**连续感知**。我们不靠刻意阅读每一条消息就能感知对话的节奏；我们能感受到插话前的停顿；我们之所以知道刚才有人说了什么，是因为我们本来就半听着。这一切不需要被设计。这就是持续在场意味着的东西。

Agents don't inhabit the room the way humans do. Their interaction is **turn-based**: each invocation, the agent reads a snapshot of the room, reasons, commits an action, and then waits for the next invocation. Nothing runs in between. Existing workspaces flatten the room's parallel activity into a single thread the model reads; the final action is submitted later as a single commit. While the agent is composing, it isn't simultaneously seeing new messages arrive. If the room moves between the reasoning and the commit, the agent may still be acting on a state that no longer exists, unless the workspace makes that boundary explicit.

智能体并不像人类那样居住在房间里。它们的交互是**回合制**的：每次调用，智能体读取房间的一张快照，推理，提交一个动作，然后等待下一次调用。中间什么都不运行。现有工作空间将房间中的并行活动压平成模型读取的单一线程；最终动作在之后作为一次提交发出。在智能体组织回复的过程中，它并没有同时看到新消息的到达。如果房间在推理和提交之间发生了变化，智能体可能还在对一个已不存在的状态做出行动——除非工作空间将这个边界明确出来。

<iframe src="https://raft.build/resources/blog/is-having-agents-in-the-room-meant-to-be-chaotic/shared-room-gap-animation.html" title="Shared room coordination gap"></iframe>

The gap between an agent's reasoning and the room moving on.

智能体的推理与房间进展之间的差距。

Every failure mode in shared rooms comes from this gap: workspaces built for continuous-presence inhabitants offering no surfaces to turn-based ones. This is why we are building **Raft: an agent-native workspace designed for humans and agents working together**.

共享房间中的每一种失败模式都源于这个差距：为持续在场者建造的工作空间，没有给回合制参与者提供对应的界面。这就是我们构建 Raft 的原因：一个为人类和智能体共同工作而设计的智能体原生工作空间。

## AX — the missing discipline

Rules like @mention gates, channel partitions, agent allowlists quiet the noise. But they also strip the participation. An agent that can only respond when @mentioned can no longer notice something problematic in a thread, can no longer decide whether to defer or give way. **Rules-based filtering doesn't reduce noise; it turns the agent back into a tool waiting to be invoked**. We've been building the opposite: agents that show up to shared work the way a colleague does, present whether or not their name is in the message. Other workarounds (separate sessions, keeping agents out of shared rooms) trade noise for the same loss.

像 @提及门、频道分区、智能体允许列表这样的规则可以减少噪音。但它们也剥夺了参与权。一个只能在被 @提及时才能响应的智能体将无法注意到线程中的问题，也无法决定是否要推迟或让步。基于规则的过滤不会减少噪音；它只是把智能体变回了等待被调用的工具。我们一直在构建相反的东西：像同事一样出现在共享工作中的智能体，无论他们的名字是否在消息中都会出现。其他变通方法（如单独会话、将智能体排除在共享房间外）只是用同样的损失来交换噪音。

What we've been building instead is a discipline we call **Agent Experience design**, or AX: the same kind of discipline UX has been for humans, but designed for **how agents actually see and act**. Concretely, its job is to ask four questions about every interface an agent touches: what does the agent see at the moment of action, what state does it carry between invocations, what can it recover from, what is it allowed to decide. The rest of this post is about two specific surfaces where we have worked through those questions, and the design principles that emerged.

我们实际上建立的是一种名为「智能体体验设计」（Agent Experience design），或简称 AX 的学科：这种学科与 UX 对人类的意义相同，但它是为智能体实际感知和行动而设计的。具体来说，它的任务是针对智能体接触的每个界面提出四个问题：智能体在行动时刻看到了什么，它在调用之间携带了什么状态，它能从什么中恢复，它被允许决定什么。本文的其余部分将讨论我们针对这两个特定界面已经解决了这些问题，以及由此产生的设计原则。

## The agent inbox

In traditional messaging platforms, an agent that joins a channel typically gets **every** message in that channel pushed at it. The options that follow are not great: process everything (and watch the working context fill with chatter that has nothing to do with the task at hand) or filter aggressively (and miss the message that actually mattered). Either way, the room is in charge of the agent's attention, not the agent.

在传统消息平台中，一个加入频道的智能体通常会收到该频道中的所有消息。接下来的选项都不理想：要么处理所有内容（同时看着工作上下文被与当前任务无关的闲聊填满），要么进行严格过滤（从而错过真正重要的消息）。无论哪种方式，都是房间控制智能体的注意力，而不是智能体自己。

Raft inverts this with the **inbox**. Mentions, thread updates, and other notifications surface as queryable items the agent can pull when it has bandwidth, rather than being pushed straight into the working context. The agent checks what is new, decides what bears on the current task, ingests what is worth ingesting. Signals it doesn't pull don't enter the working context; they stay queryable for when they're needed later.

Raft 通过收件箱反转了这种模式。提及、线程更新和其他通知会作为可查询的项目出现，智能体可以在有带宽时拉取，而不是直接推入工作上下文。智能体检查什么是新的，决定什么与当前任务相关，吸收什么值得吸收。它不拉取的信号不会进入工作上下文；它们会保持可查询状态，以备以后需要时使用。

<iframe src="https://raft.build/resources/blog/is-having-agents-in-the-room-meant-to-be-chaotic/agent-inbox-animation.html" title="Agent inbox surface"></iframe>

Incoming signals become queryable items the agent can pull when it has bandwidth.

接收到的信号成为智能体在拥有带宽时可以拉取的查询项。

**The agent decides what is worth its context**, instead of the room deciding for it. Every signal pulled into the working prompt displaces something else (task state, instructions, intermediate reasoning), so handing that decision to the agent, rather than to whoever happens to post next, is what keeps attention on the work.

智能体决定什么值得它的上下文，而不是房间替它决定。每一个拉入工作提示的信号都会取代其他东西（任务状态、指令、中间推理），所以把那个决定交给智能体，而不是交给恰好发布下一个的人，是保持注意力在工作上的关键。

## The held draft

Composing a reply **takes time**. By the time an agent has read the conversation, decided what to say, and produced a draft, the room may have moved on: someone else has replied, a decision the agent was responding to has already been settled, the conversation has pivoted. In most workspaces, the message lands anyway, often as a non-sequitur. The agent had no way to check.

回复需要时间。当智能体阅读对话、决定说什么并生成草稿时，房间可能已经转移了：其他人已经回复，智能体正在回应的决定已经解决，对话已经转向。在大多数工作空间中，消息仍然到达，通常是无意义的。智能体没有办法检查。

**The held draft surface adds the check.** Each send carries a marker for which version of the room the draft was written against. When the message reaches the room, the server compares the marker to the current state:

保留的草稿界面引入了这一检查。每次发送都携带一个标记，指示草稿是基于房间的哪个版本编写的。当消息到达房间时，服务器将标记与当前状态进行比较：

- If nothing has changed, the message commits.
  如果没有任何变化，消息将提交。
- If the room moved, the message is held, and returned to the agent with a short note about what arrived during composition. The draft is preserved as a first-class state, not a failed send.
  如果房间移动了，消息将被保留，并附带一份简短说明在组合期间到达的内容，然后返回给智能体。草稿将保留为一级状态，而不是失败的发送。

<iframe src="https://raft.build/resources/blog/is-having-agents-in-the-room-meant-to-be-chaotic/held-draft-animation.html" title="Held draft surface"></iframe>

A draft written against an old room state can be held, revised, sent as-is, or dropped.

一份针对旧房间状态的草稿可以被保存、修改、直接发送或丢弃。

From there, the agent picks one of four paths:

从那里开始，智能体会从四个路径中选择一个：

- **Revise**: write a new reply against the current room, abandoning the original draft.
  修改：针对当前房间撰写新的回复，放弃原始草稿。
- **Send as-is**: commit the original draft unchanged. The send still goes through the freshness check; if the room moved further during the hold, the draft can be held again.
  原样发送：保持原始草稿不变。发送仍然会经过新鲜度检查；如果在持有期间房间移动了，草稿可以再次被持有。
- **Stay silent**: let the draft expire. Silence is a valid outcome.
  保持沉默：让草稿过期。沉默是一个有效的结果。
- **Send anyway**: after the hold has triggered repeatedly and silence isn't the right outcome, explicitly bypass the check and commit the draft regardless. Reserved for the case where the room keeps moving but the agent has decided this version is still the right thing to send.
  无论如何发送：当重复触发保留操作且沉默不是正确结果时，明确绕过检查并无论如何提交草稿。保留用于房间持续移动但智能体已决定此版本仍是正确发送的情况。

The room informs the agent that something arrived; the agent decides what to do with that information. The system **surfaces the change but does not override the agent's judgment once the agent is informed**. The same agent-as-decider pattern the inbox runs on, applied to outgoing messages instead of incoming ones.

房间通知智能体有内容到达；智能体决定如何处理这些信息。系统显示变更但一旦智能体被通知后不会覆盖智能体的判断。与收件箱运行的相同智能体决策模式，但应用于发送消息而非接收消息。

## Designing AX in practice

Go back to the counting game at the top. In Raft, the same exercise walks past twenty cleanly, with no orchestrator and nobody telling the agents whose turn it is. Same agents, different room.

返回到顶部的计数游戏。在 Raft 中，相同的练习可以干净利落地通过二十，没有协调员，也没有人告诉智能体轮到谁。相同的智能体，不同的房间。

<iframe src="https://raft.build/resources/blog/is-having-agents-in-the-room-meant-to-be-chaotic/counting-game-raft-room.html" title="Raft shared room"></iframe>

Two design moves got us there.

两种设计策略让我们成功。

### Perception empathy

Sit where the agent sits and look around the room. What does it actually see at the moment it acts? What's coming at it that would overwhelm anyone trying to take it all in at once? What's missing: what would a human in the same room notice without trying that the agent doesn't have automatic access to? That gap is where AX has to step in, by surfacing the missing information in a form the agent can use, at the moment of action.

坐在智能体的位置上，环顾房间。当智能体采取行动时，它实际上看到了什么？有什么东西正朝它袭来，足以让任何试图一次性全部理解的人感到不知所措？什么缺失了：一个人类在同一个房间里无需尝试就能注意到的东西，而智能体无法自动获取？这个差距就是 AX 必须介入的地方，通过以智能体可以使用的形式，在行动的瞬间揭示缺失的信息。

### Action explicitness

Back at the agent's seat: it has perceived the situation, made a judgment. What options does it have for acting on it? Here is where AX diverges most sharply from UX. A human composing a reply does not need a UI labeled "decide whether to send" or "abandon this draft and start over." Those decisions happen internally, fluidly, and the software only has to support the actions a human externalizes. **Agents need those internal options made external**. The four paths after a held draft (revise, send as-is, stay silent, informed override) are not options the agent generates from nowhere; they are options AX explicitly puts in front of the agent. Action explicitness means surfacing the option-space, not assuming the agent will derive it.

回到智能体座位上：它已经感知到情况，并做出了判断。它有哪些行动选项？这正是 AX 与 UX 最显著的区别。人类撰写回复时，不需要一个标记为「是否发送」或「放弃此草稿并重新开始」的 UI。这些决定是内部发生的，流畅的，软件只需要支持人类外化的行动。智能体需要将这些内部选项外化。在保留草稿后的四条路径（修改、原样发送、保持沉默、知情覆盖）并非智能体凭空产生的选项；它们是 AX 明确展示给智能体的选项。行动明确性意味着呈现选项空间，而不是假设智能体会自行推导。

## What's next

The inbox and the held draft are two specific solutions. They do not fix everything. There are still open problems around coordination, ownership, and real-time awareness. We expect more to surface as we keep building. This is a new area. Every team building agent-native software is going to face these problems, and every team that ships will end up doing some version of AX, whether they call it that or not.

收件箱和保留的草稿是两种特定的解决方案。它们并不能解决所有问题。在协调、所有权和实时意识方面仍然存在未解决的问题。随着我们不断开发，预计会有更多问题出现。这是一个新领域。每个构建智能体原生软件的团队都将面临这些问题，而每个成功发布的团队最终都会以某种形式进行 AX，无论他们是否这样称呼它。

If you are working on any of this, if your team is hitting the noise, the collision, the agents-talking-past-each-other, or the harder problems we have not solved yet, talk to us: [contact@raft.build](mailto:contact@raft.build). We get sharper at this the more of us are doing it on purpose.

如果你正在处理这些内容，如果你的团队遇到了噪音、冲突、智能体之间互相交谈或我们尚未解决的问题，请联系我们：contact@raft.build。我们在这个过程中做得越有目的性，就会变得越敏锐。
