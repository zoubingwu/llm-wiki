---
title: "Intent by Discovery: Designing the AI User Experience"
source: "https://jakobnielsenphd.substack.com/p/intent-ux?utm_source=publication-search"
author:
  - "[[Jakob Nielsen]]"
published: 2026-03-26
created: 2026-04-22
description: "AI is not just a better chat box. It changes the user’s role from operator to supervisor, which forces UX to move from command-based interaction toward intent-based delegation, new usability metrics, orchestration layers, calibrated friction, and ultimately exploration-based interaction to clarify the user’s needs."
tags:
  - "articles"
---
> **Summary**: AI is not just a better chat box. It changes the user’s role from operator to supervisor, which forces UX to move from command-based interaction toward intent-based delegation, new usability metrics, orchestration layers, calibrated friction, and ultimately exploration-based interaction to clarify the user’s needs.  
> 摘要：AI 并不只是更好的聊天框。它把用户角色从操作员转变为监督者，这迫使用户体验从基于命令的交互转向基于意图的委派、新的可用性指标、编排层、经过校准的摩擦，以及最终通过探索来明确用户需求的交互方式。

The most important thing about AI as an interface is not that it chats in natural language. It is that it changes the user’s *role*. AI changes computing from command-based interaction to intent-based outcome specification: the user states the result to be achieved, and the system determines the procedure.  
AI 作为界面最重要的东西不是它能用自然语言聊天。它在于改变了用户角色。AI 将计算从基于命令的交互转变为基于意图的结果规范：用户声明要实现的结果，系统确定程序。

In **batch** systems, the user submitted the whole workflow at once. In **command** -based systems, the user and computer alternated turns. In **intent** -based systems, the AI will infer and execute the workflow itself: You no longer tell the computer *how*. You tell it *what* you want accomplished, and it figures out the rest.  
在批处理系统中，用户一次性提交整个工作流。在基于命令的系统里，用户和计算机交替着操作。在基于意图的系统里，AI 会自行推断并执行工作流：你不再告诉计算机怎么做。你告诉它你想完成什么，它就会处理好剩下的部分。

![](https://substackcdn.com/image/fetch/$s_!tLGV!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7329d00a-67bb-4d25-aa62-3e4fe5cf932e_937x522.jpeg)

*In command-based interaction, you strike every blow (click every icon) to gradually produce what you want, inspecting and correcting the intermediate work product at every step. (NotebookLM)  
在基于命令的交互中，你需要亲手完成每一步（点击每个图标），逐步生成你想要的结果，并在每一步检查和修正中间的工作成果。（NotebookLM）*

![](https://substackcdn.com/image/fetch/$s_!A_il!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30e034fd-610f-4209-862e-7350075afa1d_937x522.jpeg)

*Intent-based outcome specification is similar to how a Viking jarl (chief) would order, “get me silver from an English monastery,” setting in motion a chain of events that starts with the weaponsmith making the shields and ending with the raid. He doesn’t have to specify these steps because the Vikings already know what to do. Using AI is the same. (NotebookLM)  
意图驱动的结果规范类似于维京 Jarl（首领）下令，“从英格兰修道院为我弄来银器”，从而引发一系列事件，从武器匠制作盾牌开始，直到劫掠结束。他不必指定这些步骤，因为维京人已经知道该怎么做。使用 AI 也是同样的道理。（NotebookLM）*

An **intent** is not merely a wish expressed in natural language. A usable intent has at least three parts: the desired outcome, the constraints that bound acceptable behavior, and the delegation boundary that defines what the system is allowed to do. “Plan my Chicago trip” is underspecified unless the AI also knows the budget, the immovable meetings, and whether it may purchase tickets or only prepare options. Much of AI UX will therefore consist of helping users express not only what they want, but what the system is allowed to assume, optimize, and execute.  
一个意图并不仅仅是一个用自然语言表达的美好愿望。一个可用的意图至少包含三个部分：期望的结果、限制可接受行为的约束条件，以及定义系统允许做什么的委托边界。“计划我的芝加哥之旅”如果 AI 不知道预算、不可移动的会议，以及是否可以购买门票还是仅准备选项，那么这个意图就是不明确的。因此，AI 的用户体验很大程度上将包括帮助用户表达他们不仅想要什么，系统被允许假设、优化和执行什么。

Intent-driven interaction shifts the locus of control rather than being a cosmetic change in input modality. While the [GUI was a massive leap](https://www.uxtigers.com/post/gui-history), the shift from typing commands to clicking them was much smaller than the AI-driven change in interaction design. As I pointed out when I [identified intent-based outcome specification](https://www.uxtigers.com/post/ai-new-ui-paradigm) as the AI interaction modality at the dawn of modern AI in May 2023, this is an **entirely new UI paradigm**, and the first major shift in 60 years since we changed from batch processing to commands.  
意图驱动的交互改变了控制权焦点，而不仅仅是输入模式的表面变化。虽然图形用户界面（GUI）是一个巨大的飞跃，但从输入命令到点击命令的转变，远小于 AI 驱动下交互设计的变革。正如我在 2023 年 5 月现代 AI 兴起之初，将基于意图的结果规范识别为 AI 交互模式时所指出的那样，这是一种全新的 UI 范式，也是自我们从批处理转向命令式处理以来 60 年来的首次重大转变。

With a paradigm change in the UI, it stands to reason that we also need a paradigm shift in design and usability. What users do is being flipped, and UX must change with our users. AI changes the *interaction grammar* more than it changes any one screen: intent-based interaction is not just a new input method. It changes **where decisions happen**, **who bears the cognitive load**, and **what “error” means**.  
在 UI 方面发生了范式转变，那么在设计和可用性方面也需要进行范式转变。用户的行为正在被颠覆，UX 必须随着我们的用户而改变。AI 对交互语法的改变比它对任何单个界面的改变都更深远：基于意图的交互不仅仅是一种新的输入方式。它改变了决策发生的地点、谁承担认知负荷，以及“错误”的含义。

In command-based interfaces (including GUIs), the human forms a plan internally and then executes it through controls. We’ve had the design goal to make the computer “transparent” precisely because it stays inside the user’s plan. This is one reason direct manipulation felt so powerful: operating on visible objects with immediate feedback let users focus on tasks rather than on the system.  
在基于命令的界面（包括图形用户界面）中，人类在内部形成一个计划，然后通过控件执行它。我们一直有让计算机“透明化”的设计目标，正是因为它保持在用户的计划内部。这就是直接操作感觉如此强大的一个原因：通过可见对象进行操作并提供即时反馈，让用户能够专注于任务而不是系统。

In intent-based interfaces, the user externalizes part of the plan: they are no longer navigating, but delegating. The system must now interpret the goal, choose subgoals, schedule actions, acquire permissions, and handle exceptions. That pushes the system into a classic automation role, which human factors research has studied for decades: once automation takes over planning and action selection, the user shifts from operator to supervisor. Supervisory control has different failure modes than direct manipulation, and it demands different design safeguards.  
在基于意图的界面中，用户将计划的一部分外部化：他们不再是在导航，而是在授权。现在系统必须解释目标，选择子目标，安排行动，获取权限，并处理异常。这使系统进入了一个经典自动化角色，人类因素研究已经对其研究了数十年：一旦自动化接管规划和行动选择，用户就从操作员转变为监督者。监督控制与直接操作有不同的故障模式，并且需要不同的设计安全措施。

![](https://substackcdn.com/image/fetch/$s_!JMPX!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1c13b6e7-c99a-495a-ae45-b75dd4003d61_937x1046.jpeg)

*Users are changing from doing the work (operating the UI) to supervising the work. (NotebookLM)  
用户正从执行工作（操作界面）转变为监督工作。（NotebookLM）*

The winning system of the next decade will not be the one with the most aesthetically pleasing buttons, nor will it be the one with the fewest screens. It will be the system that best understands the human’s “job to be done,” autonomously selects the right tools on their behalf, clearly shows the user what is about to happen, and gracefully recovers when the user’s context is incomplete or ambiguous.  
未来十年的获胜系统，不会是按钮最美观的那个，也不会是屏幕最少的那个。它将是那个最能理解人类“待办事项”，代表他们自主选择合适工具，清晰向用户展示即将发生的事情，并在用户上下文不完整或模糊时优雅恢复的系统。

## The Three Eras of UX Goals 用户体验目标的三个时代

UX design has never had one fixed goal. The goal has shifted twice already, and it’s shifting again.  
用户体验设计从未有过一个固定的目标。这个目标已经转变了两次，现在又在转变。

![](https://substackcdn.com/image/fetch/$s_!FXZx!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F26bccd85-1901-4438-8da7-5c780f3c5420_774x1295.jpeg)

*The three goals of UX design: productivity, influence, and augmentation. (NotebookLM)  
UX 设计的三个目标：生产力、影响力和增强。（NotebookLM）*

**Era 1, Business Computing (1960–1995).** The dominant applications were accounting software, word processors, payroll systems. The UX goal was **productivity**: help people learn the software faster, make fewer errors, get more done per hour. I used to tell clients that their training budget was a pork chop ready to be eaten by usability: a well-designed system could cut onboarding time in half.  
时代 1，商业计算（1960-1995 年）。主流应用是会计软件、文字处理器、工资系统。用户体验的目标是提高生产力：帮助人们更快地学习软件，减少错误，每小时完成更多工作。我过去常告诉客户，他们的培训预算是块猪肉，等着可用性来吃：设计良好的系统可以将入职时间缩短一半。

**Era 2, The Internet (1995–2025).** The web shifted the UX goal to **influence**: get users to buy, subscribe, share, or scroll long enough to see another ad. This era leaned heavily on [Robert Cialdini’s influence principles](https://www.uxtigers.com/post/explore-discover), such as reciprocity, social proof, scarcity. It also gave us [dark patterns](https://www.uxtigers.com/post/dark-design) and infinite scroll. If you don’t pay for the product, you *are* the product.  
时代 2，互联网（1995-2025）。网络将用户体验目标转变为影响：让用户购买、订阅、分享，或滚动足够长的时间以看到另一则广告。这个时代严重依赖罗伯特·西奥迪尼的影响力原则，如互惠、社会认同、稀缺性。它也给我们带来了暗黑模式和无尽滚动。如果你不付费购买产品，你本人就是产品。

**Era 3, AI (2026 onward).** The goal shifts again, to something harder to name: **augmenting human existence**. When AI handles execution of routine tasks, human energy is freed for imagination, judgment, and meaning-making. Doug Engelbart’s original vision was to “augment the human intellect.” That framing is too narrow now. The goal of UX in the AI era is to expand what humans can do and be, not only what we can accomplish in software, but what we can decide, imagine, and coordinate. Usability, therefore, shifts from removing friction in predetermined paths to expanding the range of viable paths, opening up possibilities we haven’t yet imagined.  
时代 3，AI（2026 年及以后）。目标再次转变，转向一个更难以命名的方向：增强人类的存在。当 AI 处理常规任务的执行时，人类的精力被解放出来用于想象、判断和创造意义。道格·恩格尔巴特的原始愿景是“增强人类智力”。现在这个框架已经太狭隘了。AI 时代的用户体验目标是要扩展人类能够做什么和成为什么，不仅是我们能在软件中完成什么，还包括我们能决定、想象和协调什么。因此，可用性从消除预定路径中的摩擦转变为扩展可行的路径范围，打开我们尚未想象的可能性。

![](https://substackcdn.com/image/fetch/$s_!7zvl!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F384df653-fdd2-41d0-ae34-ed678a0a5b62_937x522.jpeg)

*AI can help us reach new heights and explore fabulous new vistas. Our design goal is no longer simply productivity or selling; it’s augmenting human existence. (NotebookLM)  
AI 可以帮助我们达到新的高度，探索奇妙的新视野。我们的设计目标不再仅仅是生产力或销售；而是增强人类的存在。(NotebookLM)*

When I present this 3-stage process of changing UX goals, I often get pushback from naïve designers who resent the implication that the main goal of their existence has been to manipulate customers. However, while becoming master manipulators might not have been the reason they embarked on a design career as idealistic youngsters, it was what they needed to do to thrive in the Internet business environment. The reason companies pay for design is to get customers to buy more and users to look at more advertisements.  
当我介绍这个改变用户体验目标的 3 阶段过程时，我经常受到那些天真设计师的反对，他们反感这种暗示，即他们存在的主要目标一直是操纵客户。然而，虽然成为熟练的操纵者可能不是他们作为理想主义年轻人选择设计职业的原因，但这是他们在互联网商业环境中生存所需要做的事情。公司支付设计费用是为了让客户购买更多，让用户观看更多广告。

In fact, one of the reasons I’m a big AI fan is that I never liked the business goals of Internet design. Of course, we’ll still need to persuade customers to buy. That will never change. But persuasion changes from manipulating humans by exploiting our many cognitive biases and weaknesses to providing clean information to AI agents that will do the buying.  
事实上，我之所以是人工智能的忠实粉丝之一，是因为我从未喜欢互联网设计的商业目标。当然，我们仍然需要说服客户购买。这一点永远不会改变。但说服方式已经从通过利用我们许多认知偏差和弱点来操纵人类，转变为向将进行购买的人工智能代理提供清晰的信息。

## The Short-Term Crisis: The Articulation Barrier 短期危机：表达障碍

Current chat-based AI interfaces suffer from severe usability problems. The intent-based paradigm demands that users write out their problems as prose text. However, as repeatedly demonstrated by literacy research, about half the population in rich countries like the United States and Germany is classified as low-literacy users, with results being even worse in poor countries.  
当前的基于聊天的 AI 界面存在严重的可用性问题。基于意图的范式要求用户以散文文本的形式写出他们的问题。然而，正如识字研究反复证明的那样，在美国和德国等富裕国家中，大约有一半的人口被归类为低识字率用户，在贫困国家中情况甚至更糟。

Writing new descriptive prose is cognitively more challenging than reading existing text. This creates an immense [articulation barrier](https://www.uxtigers.com/post/ai-articulation-barrier). It gives a massive advantage to the small fraction of the population with extraordinarily strong literacy skills. The very existence of “prompt engineering” advice is empirical evidence of this deep-rooted usability failure. If users are forced to learn arcane methods to tickle an AI into coughing up the right result, the interface fails human-centered design standards.  
撰写新的描述性散文在认知上比阅读现有文本更具挑战性。这造成了一个巨大的表达障碍。它给人口中极少数具有超凡读写能力的人带来了巨大的优势。“提示工程”建议的存在本身就是这种根深蒂固的可用性失败的实证证据。如果用户被迫学习晦涩的方法来刺激人工智能吐出正确的结果，那么界面就未能符合以人为本的设计标准。

![](https://substackcdn.com/image/fetch/$s_!sDuT!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a49bdcc-d5ef-4ac2-a33c-375c3aaa034f_937x522.jpeg)

*The articulation barrier is the problem of making your intent clear. It’s often hard to put something into words, especially if the goal is inherently nonverbal, like the shape of something, or if the user has low literacy skills. (NotebookLM)  
表达障碍是让你的意图清晰的问题。将事情用语言表达出来通常很困难，尤其是当目标本身是非语言的，比如某个形状，或者如果用户识字能力较低。（NotebookLM）*

In the short term, UX professionals must design to overcome this articulation barrier. We cannot rely on users generating perfect text from a blank canvas. [Prompt augmentation](https://www.uxtigers.com/post/prompt-augmentation) and [aided prompt understanding](https://www.uxtigers.com/post/prompt-understanding) are two sets of design patterns to help users refine their intent for AI.  
在短期内，用户体验专业人士必须设计以克服这种表达障碍。我们不能依赖用户从空白画布上生成完美的文本。提示增强和辅助提示理解是两组设计模式，帮助用户完善他们对人工智能的意图。

![](https://substackcdn.com/image/fetch/$s_!-4ow!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8333123e-7731-4b84-88c0-fba6d97b903a_937x522.jpeg)

*Style galleries are one of the design patterns for prompt augmentation. It’s easier to select something you like from a range of styles than it is to describe the style in words. (NotebookLM)  
风格画廊是提示增强的一种设计模式。从一系列风格中选择你喜欢的要比用文字描述风格更容易。(NotebookLM)*

The articulation barrier is also a memory problem. If users must restate their preferences, recurring constraints, tone of voice, risk tolerance, and exceptions in every session, the interface remains unusable no matter how fluent the model sounds. A mature intent-based system, therefore, needs a visible, editable user model: a place where people can inspect what the AI believes about them, correct it, override it temporarily, or tell it to forget. In the AI era, memory becomes a first-class UX surface.  
表达障碍也是一个记忆问题。如果用户必须在每次会话中重新陈述他们的偏好、重复的约束、语气、风险承受能力和例外情况，那么无论模型听起来多么流畅，界面仍然无法使用。因此，成熟的基于意图的系统需要一个可见、可编辑的用户模型：一个人们可以检查 AI 对他们有什么看法、纠正它、暂时覆盖它或告诉它忘记的地方。在 AI 时代，记忆成为了一流的用户体验表面。

In the long run, we need a new approach to designing intent-based interactions.  
从长远来看，我们需要一种新的方法来设计基于意图的交互。

## Redefining Usability Metrics 重新定义可用性指标

Because the locus of control has reversed, the [core usability metrics](https://www.uxtigers.com/post/what-is-ux) we have used for decades to evaluate UX must be completely rewritten. In the command-based paradigm, usability was measured by how efficiently a user could learn and execute the steps to accomplish a task. My [ten classic heuristics](https://www.uxtigers.com/post/10-heuristics-reimagined) assumed a human navigating a structured interface one step at a time.  
由于控制权已经反转，我们过去几十年用来评估用户体验的核心可用性指标必须完全重写。在基于命令的范式中，可用性是通过用户学习并执行完成任务步骤的效率来衡量的。我的十个经典启发式方法假设人类一次一步地导航结构化界面。

In an intent-based ecosystem, the [system acts probabilistically](https://www.uxtigers.com/post/ai-uncertainty-ux) rather than deterministically. Usability is no longer judged by the elegance of the steps on screen, but by the quality of the machine’s understanding and the safety of its execution.  
在一个基于意图的生态系统中，系统以概率性而非确定性运行。可用性不再由屏幕上步骤的优雅程度来评判，而是由机器的理解质量及其执行的安全性来决定。

My classic usability heuristics will still hold, but must be reinterpreted. “Visibility of system status” used to mean: show progress through a sequence of steps the user chose. In an agentic workflow, it becomes: show *what the system believes the user intends*, what it is doing to satisfy that intention, and what it plans to do next, even when none of those steps were explicitly requested. “User control and freedom” used to mean: allow undo, cancel, and escape from a dialog or flow. In an intent-based environment, it becomes: allow interruption of an executing plan, allow correction of misunderstood intent, and allow safe rollback across multiple systems. Undo is harder when the system has already sent an email, booked a ticket, or modified a shared document. The old principle becomes more important, but also more expensive to implement.  
我的经典可用性启发式原则仍然适用，但必须重新解读。“系统状态的可见性”过去意味着：显示用户选择的步骤序列的进度。在主动式工作流程中，它变成了：显示系统认为用户意图的内容、系统正在做什么以满足该意图，以及系统计划下一步做什么，即使这些步骤都没有被明确请求。“用户控制和自由”过去意味着：允许撤销、取消和从对话框或流程中退出。在基于意图的环境中，它变成了：允许中断执行的计划、允许纠正误解的意图，以及允许在多个系统之间安全回滚。当系统已经发送了电子邮件、预订了票务或修改了共享文档时，撤销变得更加困难。旧原则变得更加重要，但实现起来也更加昂贵。

The evaluation of a successful interface shifts:  
对成功的界面的评估发生了转变：

- **From Discoverability to Intent Capture:** Can the system accurately map a vague natural-language request to a highly structured machine action? Did it infer the goal, constraints, and priorities correctly?  
	从可发现性到意图捕获：系统能否准确地将模糊的自然语言请求映射到高度结构的机器操作？它是否正确推断出目标、约束和优先级？
- **From Error Prevention to Clarification Quality:** Because we cannot [disable invalid buttons](https://www.uxtigers.com/post/inactive-buttons) to prevent hallucination, the metric shifts to how gracefully the system handles ambiguity. Does the system ask the right follow-up questions at the right time? The best clarifying question is the smallest intervention that prevents the largest mistake.  
	从错误预防到澄清质量：由于我们不能禁用无效按钮来防止幻觉，指标转变为系统如何优雅地处理歧义。系统是否在正确的时间提出正确的后续问题？最好的澄清问题是防止最大错误的最小干预。
- **From “Time to Learn” to “Ease of Delegation”:** Traditional UI learnability becomes less relevant when there are no menu hierarchies to understand and navigate. The primary metric becomes how comfortably a user can delegate a multi-step objective without fearing catastrophic failure. Time-to-correct becomes far more important.  
	从“学习时间”到“授权便捷性”：当没有菜单层次结构需要理解和导航时，传统的 UI 可学习性变得不再那么重要。主要指标变成了用户在无需担心灾难性失败的情况下，如何舒适地授权多步骤目标。纠正时间变得远为重要。
- **From Execution Efficiency to Verification Efficiency (Evaluability):** In command-based UIs, the user’s primary cognitive load was executing the task step-by-step. In intent-based systems, *execution* is cheap, but *evaluation* becomes the bottleneck. The usability metric shifts to how rapidly and accurately a user can verify that the AI’s output matches their actual goal. Interfaces must be optimized for “evaluability,” allowing users to judge quality and appropriateness (whether the AI’s work is fit for its external purpose) without painstakingly combing through every detail of the result.  
	从执行效率到验证效率（可评估性）：在基于命令的 UI 中，用户的主要认知负荷是按步骤执行任务。在基于意图的系统里，执行很廉价，但评估成了瓶颈。可用性指标转变为用户能多快、多准确地验证 AI 的输出是否与他们的实际目标相符。界面必须针对“可评估性”进行优化，使用户能够判断质量与恰当性（AI 的工作是否适合其外部目的），而无需费力地检查结果的每一个细节。

![](https://substackcdn.com/image/fetch/$s_!2N61!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0522bf33-3445-42d9-a598-b7e02afb8656_937x522.jpeg)

*Changing the usability goal from making it easy to make something to making it easy to evaluate the quality and suitability of what was made. (NotebookLM)  
将可用性目标从使其易于制作某物转变为使其易于评估所制作内容的品质和适用性。（NotebookLM）*

- **From Visibility of System Status to Execution Transparency:** The system must project an accurate mental model of its operational plan *before* and *during* execution. It must show what it believes the user intends and what it plans to do next.  
	从系统状态可见性到执行透明性：系统必须在执行前后展示其操作计划的准确心智模型。它必须显示它认为用户意图是什么以及它计划下一步做什么。
- **From User Satisfaction to Trust Calibration:** Do users rely on the agent appropriately, neither over-trusting nor under-using it? Trust is no longer a soft emotional byproduct; it is the primary functional metric of an intent-based system. Trust calibration also depends on showing why the system preferred one plan over another. A good orchestration UI should be able to say, in effect, “I chose Plan A over Plan B because cost mattered more than speed,” or “This recommendation would change if your deadline moved by two days.” Counterfactual explanation is often more useful than a generic confidence score because it teaches users the model’s decision logic and shows where intervention would matter.  
	从用户满意度到信任校准：用户是否适当依赖代理，既不过度信任也不过度使用它？信任不再是一种柔软的情感副产品；它是基于意图系统的首要功能指标。信任校准还取决于展示系统为何选择一个计划而非另一个。一个好的编排界面应该能够有效地说，“我选择计划 A 而非计划 B，因为成本比速度更重要，”或者“如果您的截止日期推迟两天，这个推荐会改变。”反事实解释通常比一个通用的置信度分数更有用，因为它教会用户模型的决策逻辑，并显示干预会起作用的地方。

![](https://substackcdn.com/image/fetch/$s_!fNSM!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F521dae34-3c0b-4be0-8269-c44afd059711_937x522.jpeg)

*How much do you trust your AI agent? Do you want to give it your entire sack of silver, or just a coin or two? (NotebookLM)  
你有多信任你的 AI 代理？你想把你的全部银币都给它，还是只给一两枚？(NotebookLM)*

These changes imply a different UX measurement toolkit. *Time-on-task* is less important when the human contribution is “say what you want” (and the AI then spends hours performing the task), but *time-to-correct* becomes a central metric. Traditional *error counts* must be split into user slips versus system misinterpretations. *Satisfaction* becomes increasingly bound to perceived agency: users can be pleased with outcomes but still feel uneasy if they cannot tell what happened or why.  
这些变化意味着需要不同的用户体验测量工具包。当人类贡献是“想说就说”（然后 AI 再花费数小时执行任务）时，任务耗时就不那么重要了，但纠正时间成为核心指标。传统的错误计数必须分为用户失误和系统误读。满意度越来越与感知的自主性相关联：用户可以对结果感到满意，但如果他们无法知道发生了什么或为什么，仍然会感到不安。

## The Triple-Layered Design Model 三层设计模型

At first glance, [“UI is dead,”](https://www.uxtigers.com/post/ux-roundup-20250825) since users will interact with AI agents more than they’ll be clicking around apps or websites.  
初看之下，“UI 已死”，因为用户将更多地与 AI 代理交互，而不是在应用程序或网站上点击来点击去。

However, the GUI will not disappear; it will be demoted. The screen stops being the place where work *begins*, and instead becomes the place where work is inspected, negotiated, and corrected. As software shifts from isolated apps toward task orchestration, mature intent-based systems will settle into a triple-layered design model.  
然而，GUI 不会消失；它会被降级。屏幕不再是工作的起点，而是变成了检查、协商和纠正工作的场所。随着软件从孤立的应用程序转向任务协调，成熟的基于意图的系统将稳定在一个三层设计模型中。

![](https://substackcdn.com/image/fetch/$s_!UbJb!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdbf40c96-43ef-4994-be87-ae108199c242_774x1295.jpeg)

*The three layers of AI user experience architecture: intent, orchestration, and direct manipulation. (NotebookLM)  
AI 用户体验架构的三个层次：意图、编排和直接操作。（NotebookLM）*

**1\. The Intent Surface:** This is the first layer, where the user states an outcome. It must be highly context-aware, accepting multimodal inputs like voice, text, screen context, or camera data to overcome the articulation barrier. As this layer matures, it will increasingly rely on **implicit intent inference**. By synthesizing ambient context (e.g, calendar events, active screen content, cursor hesitations, and historical routines), the system can proactively offer high-probability intents for the user to simply confirm, overcoming the articulation barrier by drafting the prompt for them.  
1\. 意图界面：这是第一层，用户在此声明期望的结果。它必须高度感知上下文，接受语音、文本、屏幕上下文或相机数据等多模态输入，以克服表达障碍。随着这一层的成熟，它将越来越依赖隐式意图推断。通过综合环境上下文（例如，日历事件、当前屏幕内容、光标犹豫和历史习惯），系统可以主动为用户提供高概率意图供其确认，通过代为起草提示来克服表达障碍。

**2\. The Orchestration Surface:** This is the critical negotiation layer. Before an agent executes high-stakes actions, it must reveal its proposed plan, expose the provenance of its data, and seek consent. This UI functions as an audit layer. It visualizes steps, provides execution transparency, and manages “permission choreography.” Preview is not enough. Intent-based systems also need explicit post-action receipts. After an agent completes a task, the UI should summarize what it changed, which systems it touched, what assumptions it used, and what can still be undone. In traditional GUIs, the user often knew what happened because they executed each step themselves. In agentic systems, that implicit knowledge disappears. The system must manufacture legibility after the fact.  
2\. 编排界面：这是关键协商层。在代理执行高风险操作之前，它必须展示其提议的计划，暴露其数据的来源，并寻求同意。这个界面充当审计层。它可视化步骤，提供执行透明度，并管理“权限编排”。预览是不够的。基于意图的系统也需要明确的操作后收据。在代理完成任务后，界面应总结其更改的内容，所触达的系统，所使用的假设，以及仍可撤销的内容。在传统 GUI 中，用户通常知道发生了什么，因为他们自己执行了每个步骤。在代理系统中，这种隐含的知识消失了。系统必须在事后制造可读性。

Most important work is not solitary. In organizations, the agent acts inside shared systems, shared budgets, and shared responsibilities. The orchestration layer must therefore show not only what it plans to do for *me*, but also *who else* will be affected, which policies constrain the action, and who inherits the consequences. Intent in enterprise UX is never just personal preference; it is personal preference filtered through institutional rules. The Orchestration surface must therefore resolve **collaborative intent** by flagging conflicting directives from multiple human stakeholders or specialized AI sub-agents, and negotiating consensus before execution. Recognizing the need to support and coordinate multiple users, rather than just a single user, becomes more important in AI systems than in traditional GUI design.  
最重要的工作不是孤立的。在组织中，代理在共享系统、共享预算和共享责任中运作。因此，编排层必须不仅显示它为我计划做什么，还要显示其他人会受到什么影响，哪些政策会限制行动，以及谁会继承后果。企业用户体验中的意图绝不只是个人偏好；它是通过机构规则过滤后的个人偏好。因此，编排界面必须通过标记来自多个人类利益相关者或专业 AI 子代理的冲突指令来解决协作意图，并在执行前协商共识。认识到支持和管理多个用户比只管理单个用户更为重要，在 AI 系统中比在传统的 GUI 设计中变得更加重要。

**3\. The Direct-Manipulation Surface:** The traditional GUI remains intact as a fallback layer. This is the familiar world of tapping, dragging, and scrubbing, reserved for edge-case editing, granular corrections, and emergency overrides. In a mature intent UI, the screen becomes where work is **inspected**, **negotiated**, and **corrected**, because the work itself is done off-screen by AI.  
3\. 直接操作界面：传统的 GUI 仍然作为一个备用层保持完整。这是人们习惯的点击、拖动和滑动操作的世界，保留用于边缘情况编辑、精细修正和紧急覆盖。在一个成熟的意图 UI 中，屏幕成为工作检查、协商和修正的地方，因为工作本身是在屏幕外由 AI 完成的。

Thus, [direct manipulation](https://www.uxtigers.com/post/direct-manipulation) does not die; it migrates one level higher in the abstraction stack. Instead of manipulating raw controls, users will manipulate *plans*. They will drag a task from “later” to “now,” scrub through a proposed sequence on a timeline, tap a source chip to check provenance, or reorder a travel itinerary. That is still direct manipulation, retaining the biological satisfaction of shaping causality, just applied at a higher level of abstraction.  
因此，直接操作并未消亡；它向抽象堆栈的更高层次迁移。用户不再操作原始控件，而是操作计划。他们会将任务从“稍后”拖到“现在”，在时间轴上滑动查看建议序列，点击源芯片检查来源，或重新排序旅行行程。这仍然是直接操作，保留了塑造因果关系的生物性满足感，只是应用在更高层次的抽象上。

## Supervisory Control and Intentional Cognitive Friction 监督控制与有意认知摩擦

Because of the phenomenological gap introduced by intent-based interfaces, in which actions occur offscreen without direct bodily involvement, the user’s role shifts profoundly. The correct analogy is no longer *driving* a car; it is *managing* a chauffeur.  
由于基于意图的界面引入了现象学差距，其中操作在屏幕外进行且没有直接的肢体参与，用户的角色发生了深刻变化。正确的类比不再是开车；而是管理一个司机。

This supervisory control requires a completely different set of design principles. The instinct of every UX designer trained in the command-based era is to ruthlessly eradicate friction. For routine, low-stakes tasks (sorting spam, scheduling a recurring meeting), the frictionless ideal remains correct. But for high-stakes tasks (e.g., financial transactions, medical decisions, sending sensitive emails), the interface must intentionally slow the user down.  
这种监督控制需要一套完全不同的设计原则。在基于命令的时代接受过训练的每个用户体验设计师的本能都是无情地消除摩擦。对于常规、低风险的任务（如整理垃圾邮件、安排定期会议），无摩擦的理想仍然是正确的。但对于高风险任务（例如财务交易、医疗决策、发送敏感邮件），界面必须有意放慢用户的速度。

Autonomy should be earned rather than granted all at once. An effective agent should begin in a conservative mode that drafts, prepares, and asks for confirmation, while accumulating a performance history inside a bounded domain. As reliability becomes evident, the interface can let the user widen the agent’s action budget: first draft, then prepare, then execute low-risk actions, and only later touch high-stakes or externally visible systems. The right model is not binary autonomy versus manual control. It is progressive delegation.  
自主性应当逐步赢得而非一次性赋予。一个有效的代理应当以保守模式开始，进行草拟、准备并请求确认，同时在限定域内积累性能历史。当可靠性变得明显时，界面可以让用户扩大代理的行动预算：先草拟，然后准备，接着执行低风险操作，而只在后期接触高风险或外部可见的系统。正确的模型不是二元自主性对抗手动控制。它是渐进式授权。

We must choreograph *intentional cognitive friction*. Generative AI often delivers synthesized answers that feel flawlessly authoritative, leading to the Plausibility Trap. Because the interface is clean and instant, authority bias takes over, tempting the user to skip critical analysis.  
我们必须编排有意的认知摩擦。生成式 AI 经常提供看似权威的合成答案，导致陷入可信度陷阱。由于界面简洁且即时，权威偏见就会占据上风，诱使用户跳过批判性分析。

To combat this dangerous automation bias, we must force a moment of reflection. When an AI proposes moving $500, we should not offer a frictionless “Approve All” button. We must use granular authorization, artificial time delays (like a three-second countdown), and provenance highlighting to ensure the human remains cognitively responsible for the outcome.  
要应对这种危险的自动化偏见，我们必须强制进行反思时刻。当 AI 提议转移 500 美元时，我们不应提供无摩擦的“全部批准”按钮。我们必须使用粒度授权、人工时间延迟（如三秒倒计时）和来源高亮，以确保人类对结果保持认知责任。

![](https://substackcdn.com/image/fetch/$s_!lMwU!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe00598d5-ce03-490f-8ed8-9354c4636f96_937x522.jpeg)

*At appropriate points in the workflow, make the user pause to ensure everything is right. (NotebookLM)  
在流程的适当节点处，让用户暂停以确保一切正确。(NotebookLM)*

Friction shouldn’t just be a blanket delay; it should be applied surgically. The UX must visually communicate the AI’s confidence levels so the user knows exactly where to apply their cognitive effort. We need Epistemic UIs: interfaces that visually map the system’s uncertainty. Instead of presenting synthesized answers as monolithic, authoritative truths, the UI should highlight probabilistic leaps, flag data with weak provenance, and color-code confidence levels. By visualizing the AI’s own doubt, the interface directs human cognitive energy precisely to the areas requiring judgment, transforming friction from a blunt delay into a precision tool.  
摩擦不应仅仅是一种笼统的延迟；它应该像外科手术一样精准应用。用户体验必须能直观传达 AI 的置信水平，让用户确切知道应该在何处投入认知努力。我们需要认识论界面（Epistemic UI）：能直观映射系统不确定性的界面。界面不应将合成答案呈现为单一、权威的真理，而应突出概率性跳跃，标记来源薄弱的数据，并对置信水平进行颜色编码。通过可视化 AI 自身的疑虑，界面能精准引导人类认知能量到需要判断的领域，将摩擦从粗暴的延迟转变为精密的工具。

![](https://substackcdn.com/image/fetch/$s_!mX5O!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc34f8f5c-e0c8-4c6c-8393-b1ba30c84cdd_937x522.jpeg)

*Epistemic UI: when we don’t know what lies ahead (for example, what creature made this footprint), we should be explicit about our level of uncertainty to improve decision quality. (NotebookLM)  
认识论界面：当我们不知道前方有什么（例如，是什么生物留下了这个脚印）时，我们应该明确表达自己的不确定程度，以提高决策质量。（NotebookLM）*

Naturally, the threshold for this friction must be deeply context-aware. A $500 transfer requires high friction in a personal banking app, but is a frictionless, automated rounding error for a corporate finance AI. Just as human organizations use escalating approval ladders for larger expenditures, AI UX must dynamically scale cognitive friction based on the user’s role, the organization’s risk tolerance, and the reversibility of the action. We will simply tweak traditional management heuristics to account for the unique vulnerabilities of machine intelligence.  
自然地，这种摩擦的阈值必须深刻地依赖于上下文。在个人银行应用中，500 美元的转账需要高摩擦，但在企业金融 AI 中，它是一种无摩擦的自动四舍五入误差。正如人类组织使用逐步审批的阶梯来处理较大的支出，AI 用户体验必须根据用户角色、组织风险承受能力和操作的可逆性动态调整认知摩擦。我们将简单地调整传统的管理启发式方法，以考虑机器智能的独特脆弱性。

User experience for AI agents will be similar to traditional management techniques in many cases. Similar, not identical, of course: many existing management methods are intended to deal with managing human underlings who suffer from human weaknesses. When managing AI agents, we’ll tweak our old management lessons to account for AI’s weaknesses.  
用户体验在许多情况下将与传统的管理技术相似。当然，相似但不相同：许多现有的管理方法旨在处理管理那些具有人类弱点的人类下属。在管理人工智能代理时，我们将调整我们旧的管理教训，以考虑到人工智能的弱点。

## Slow AI: The Return of Zombie UX 慢速 AI：僵尸 UX 的回归

As we entrust AI with increasingly complex workflows, we face a bizarre blast from the past: the Zombie UX of batch processing is being revived. While simple chat queries take seconds, powerful AI tools like Deep Research or video-generation models can take 10 minutes to hours to complete a run. We are rapidly approaching a reality where AI agents will run independently for 30 hours or even days to orchestrate massive tasks.  
随着我们将 AI 托付给日益复杂的流程，我们面临一个奇怪的复古现象：批量处理的僵尸式用户体验正在被重新启用。虽然简单的聊天查询只需几秒钟，但像 Deep Research 或视频生成模型这样强大的 AI 工具完成一次运行可能需要 10 分钟到数小时。我们正迅速接近一个现实，即 AI 代理将独立运行 30 小时甚至数天来协调大型任务。

When turn-taking interaction is destroyed by extreme delays, we must design for “ [Slow AI](https://www.uxtigers.com/post/slow-ai).” Waiting hours for results creates intense anxiety regarding whether the AI is heading in the right direction.  
当轮流交互因极端延迟而被破坏时，我们必须设计“慢速 AI”。等待数小时的结果会让人极度焦虑，不确定 AI 是否正朝着正确的方向前进。

![](https://substackcdn.com/image/fetch/$s_!Fsa0!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda4415bb-e6bb-4aec-93c7-ac5a403672a4_937x522.jpeg)

*Sometimes AI takes forever to deliver results. We need to design for this reality, because it will only get worse with increasing AI capabilities and task horizons. (NotebookLM)  
有时 AI 耗费很长时间才能提供结果。我们需要针对这种现实进行设计，因为随着 AI 能力和任务范围的提升，情况只会变得更糟。（NotebookLM）*

To maintain user control, Slow AI requires distinct UX interventions:  
为保持用户控制，Slow AI 需要不同的用户体验干预：

**1\. Clarification and Run Contracts:** A slow AI should never guess a user’s intent. It must ask clarifying questions upfront. It should then present an explicit run contract showing the estimated time window, a cost cap, the definition of “done,” and hard boundaries (e.g., “will not email external parties”). We will need new usability research to replace our old response time guidelines  
1\. 澄清和运行契约：一个缓慢的 AI 永远不应该猜测用户的意图。它必须在开始时就提出澄清问题。然后，它应该呈现一个明确的运行契约，显示预计的时间窗口、成本上限、“完成”的定义以及硬性边界（例如，“不会联系外部方”）。我们需要新的可用性研究来取代我们旧的响应时间指南。

**2\. Conceptual Breadcrumbs:** Traditional percentage bars are useless for 10-hour tasks. Instead of just showing technical logs, the AI must provide “Conceptual Breadcrumbs” as short, synthesized summaries of intermediate conclusions. If the AI reports a flawed conclusion early on, the user can intervene immediately.  
2\. 概念性面包屑：传统的百分比条对于 10 小时的任务毫无用处。AI 不应只显示技术日志，而必须提供“概念性面包屑”，即中间结论的简短综合摘要。如果 AI 在早期报告了有缺陷的结论，用户可以立即干预。

**3\. Context Reboarding:** When a task takes 30 hours, users will context switch and forget what they originally asked for. The UI must gracefully reboard the user with a Resumption Summary: reminding them of the original intent, key decisions made during the run, and the current status.  
3\. 上下文重新接入：当任务耗时 30 小时时，用户会进行上下文切换并忘记他们最初的要求。界面必须优雅地让用户重新接入任务，提供“恢复摘要”：提醒他们最初的意图、运行期间做出的关键决策以及当前状态。

**4\. Tiered Notifications:** We must employ context-aware attention management. Notifications should be tiered: immediate push notifications only for critical blocks requiring user intervention, low-priority emails for decisions that simply affect quality, and batched digests for task completions.  
4\. 分层通知：我们必须采用情境感知的注意力管理。通知应分层处理：仅对需要用户干预的关键模块使用即时推送通知，对仅影响质量的决策使用低优先级邮件，对任务完成情况使用批量摘要。

**5\. Progressive Disclosure and Salvage Value:** Long-running tasks aggressively exacerbate the sunk cost fallacy. Users will accept substandard work simply because they waited 20 hours for it. The UI must progressively disclose partial results (rough outlines, wireframes) so users can course-correct early. Crucially, if a user stops a run, the UI must explicitly show the “salvage value” (which intermediate artifacts can be reused), making frictionless restarts less psychologically painful.  
5\. 逐步披露与残值：长期运行的任务会加剧沉没成本谬误。用户会因为等待了 20 个小时而接受次品工作。UI 必须逐步披露部分结果（粗略轮廓、线框图），以便用户能及早调整方向。关键在于，如果用户停止运行，UI 必须明确显示“残值”（哪些中间产物可以复用），使无缝重启的心理痛苦减少。

![](https://substackcdn.com/image/fetch/$s_!ERCN!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd80fdd96-94b2-4120-a113-ac540395e365_937x522.jpeg)

*Even when AI fails, you may be able to reuse part of what it did, reducing the pain of the sunk cost of an extended AI run. (NotebookLM)  
即使 AI 失败，你或许也能重用它已完成的部分工作，从而减少延长 AI 运行所带来的沉没成本之痛。(NotebookLM)*

## The Long-Term Vision: Exploring Latent Space 长期愿景：探索潜在空间

Looking further ahead into the AI Era, [creativity shifts from making to discovery](https://www.uxtigers.com/post/explore-discover). We are moving away from **building** (pre-AI) and **describing** (current intent-based generation) toward **exploring** a latent solutions space created by AI.  
展望更远的 AI 时代，创造力从制造转向发现。我们正从构建（AI 之前）和描述（当前基于意图的生成）转向探索由 AI 创建的潜在解决方案空间。

![](https://substackcdn.com/image/fetch/$s_!Grr-!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ac199bc-411f-4b5b-bee2-8404644f6f78_937x522.jpeg)

*Only as you are navigating through the latent space of AI options do you discover what is there and which turn you want to take next in the journey towards the as-yet unknown destination. (NotebookLM)  
只有当你正在探索 AI 选项的潜在空间时，你才会发现那里有什么以及你想在通往尚未知晓的终点的旅程中下一步要走向何方。（NotebookLM）*

Since AI generates a thousand competent solutions in a minute, the user’s primary need is no longer production, but discovery. Iteration stops being mainly about fixing mistakes and becomes a way of exploring a multidimensional solution space. However, current UIs are far too linear, relying on the old-school “Back” button. The future of UX requires UI support for navigating a multi-branched exploration. We will need tools like “Look Lock” to freeze certain semantic styles or visual invariants while we explore adjacent dimensions. Future interfaces will feel less like pathways and more like collaborative playgrounds.  
由于 AI 每分钟能生成成千上万个合格方案，用户的主要需求不再是生产，而是发现。迭代不再主要关于修正错误，而成为一种探索多维解决方案空间的方式。然而，当前的 UI 过于线性，依赖老式的“返回”按钮。未来的 UX 需要 UI 支持多分支探索的导航。我们将需要像“锁定查看”这样的工具，在探索相邻维度时冻结某些语义风格或视觉不变量。未来的界面将感觉不像路径，更像协作游乐场。

**“Intent by discovery”** should become the future of human-AI interaction. Don’t assume that users know what they want. Help them recognize it progressively by reacting to alternatives, locking in what matters, and exploring adjacent possibilities.  
“通过发现形成意图”应成为人机交互的未来。不要假设用户知道他们想要什么。通过对备选方案做出反应、锁定重要内容以及探索相邻可能性，逐步帮助他们识别自己的真实意图。

![](https://substackcdn.com/image/fetch/$s_!qqAD!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5eb68a90-083e-45c7-b467-52c344fb1988_937x522.jpeg)

*Once you discover a new land, you may recognize it as your desired destination. (NotebookLM)  
一旦你发现了一片新土地，你可能会认出它作为你理想的目的地。(NotebookLM)*

While highly effective, current design patterns for prompt augmentation are essentially putting training wheels on a text box. Prompt augmentation still forces the user through a linguistic bottleneck, assuming they *have* a specific intent but simply lack the vocabulary. To fully support intent by discovery, UX must abandon the chat box as the default AI interaction model and stretch into multi-modal, spatial, and behavioral paradigms.  
尽管非常有效，当前的提示增强设计模式本质上是在文本框上装了训练轮。提示增强仍然强迫用户通过语言瓶颈，假设他们有特定意图但只是缺乏词汇。为了通过发现来全面支持意图，用户体验必须放弃聊天框作为默认的 AI 交互模型，并拓展到多模态、空间和行为范式。

Here are my predictions for how UX design might evolve to support intent by discovery beyond simple prompting.  
以下是我对 UX 设计如何通过发现而非简单提示来支持意图可能演变的预测。

## 1\. Spatial Navigation of Latent Space 1. 潜在空间的空间导航

Currently, AI interfaces operate a bit like a slot machine: you pull the lever (prompt) and get a discrete result. In the future, UX will allow users to navigate the AI’s latent space (the multidimensional map of all possible solutions) visually and spatially.  
目前，AI 界面有点像老虎机：你拉动杠杆（提示）就会得到一个离散的结果。未来，用户体验将允许用户在 AI 的潜在空间（所有可能解决方案的多维地图）中视觉和空间地导航。

**Semantic Topographies:** Instead of typing “make the design more professional but slightly playful,” the user might be presented with an interactive 2D map of generated outputs. Dragging a cursor across this space morphs the output in real-time. The user discovers their intent by seamlessly exploring adjacent possibilities, stopping when the output simply “feels right.” Such visual exploration will require real-time AI generation of updated alternatives, and we’re luckily already seeing improved models that emphasize fast response time.  
语义地形图：用户不必输入“使设计更专业但略带趣味性”，而是可能会被展示一个交互式 2D 生成输出地图。将鼠标光标拖过这个空间，输出会实时变形。用户通过无缝探索相邻可能性来发现他们的意图，当输出感觉“正好”时停止。这种视觉探索需要实时 AI 生成更新的替代方案，幸运的是我们已经看到强调快速响应时间的改进模型。

**Divergent Routing:** Because humans are better at recognizing a solution than describing it, UIs will heavily leverage divergent generation. The AI generates edge-case variations and asks, “Better 1 or better 2?” The user’s selections iteratively narrow down the infinite possibility space through pure recognition, bypassing recall entirely.  
发散式路径探索：因为人类在识别解决方案方面比描述它更擅长，所以 UI 将大量利用发散生成。AI 生成边缘情况的变化，并问：“1 更好还是 2 更好？”用户的选择通过纯粹的识别迭代地缩小无限的可能性空间，完全绕过了回忆。

## 2\. Direct Object Manipulation (Blending GUI and AI) 2. 直接对象操作（融合 GUI 与 AI）

One of the major regressions of current chat-based AI is the loss of direct manipulation: the tactile tweaking we perfected in the GUI era. The future of intent by discovery will hybridize the two paradigms.  
当前基于聊天的 AI 的主要倒退之一是失去了直接操作：我们在 GUI 时代完善的触觉微调。通过发现形成意图的未来将融合这两种范式。

Users will refine their intent by physically altering the AI’s output. If an AI generates a website mockup or a floor plan, and the user drags a hero image or a wall to make it larger, the AI doesn’t just register a coordinate change. It reverse-engineers the underlying intent (“Ah, the user prioritizes visual impact and open space”) and automatically adjusts the typography, lighting, or secondary elements to maintain coherence. The tactile action becomes the prompt.  
用户将通过物理方式修改 AI 的输出内容来明确他们的意图。如果 AI 生成一个网站模型或平面图，而用户拖动一个英雄图片或墙壁使其变大，AI 不只是记录坐标变化。它会逆向工程底层意图（“啊，用户优先考虑视觉冲击力和开放空间”），并自动调整排版、灯光或次要元素以保持一致性。这种触觉操作变成了提示。

## 3\. Socratic Scaffolding 3. 苏格拉底式支架

To support discovery, the system must stop being a passive order taker waiting for a master prompt, and become an active interviewer.  
为了支持发现，系统必须停止做一个被动地等待主提示的接单者，而要成为一个主动提问者。

**Progressive Probing:** If a user’s initial intent is vague (“I need a strategy for a product launch”), the AI pauses instead of hallucinating a generic 10-page document. It responds with diagnostic questions or visual counterfactuals: “Are we optimizing for immediate revenue or long-term brand awareness?” By proactively presenting constraints, the AI helps the user chisel away at the marble until their exact intent is revealed.  
渐进式追问：如果用户的初始意图模糊（“我需要一个产品发布策略”），AI 会暂停而不是编造一份通用的 10 页文档。它通过提出诊断性问题或视觉反事实来回应：“我们是优化即时收入还是长期品牌知名度？”通过主动提出限制条件，AI 帮助用户逐步雕琢需求，直到确切意图显露出来。

![](https://substackcdn.com/image/fetch/$s_!qHJB!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F708af64d-6e98-48b4-9f33-3d0b7913394b_937x522.jpeg)

*The Greek philosopher Socrates famously taught his students by asking them questions. Similarly, AI can help users achieve their goals by asking insightful, probing questions. (NotebookLM)  
希腊哲学家苏格拉底以向学生提问的方式著名地教导他们。类似地，人工智能可以通过提出富有洞察力、深入的提问帮助用户实现他们的目标。（NotebookLM）*

## 4\. Ephemeral and Generative UIs 4. 临时且生成式的 UI

We are accustomed to static interfaces where the controls (dropdowns, menus) are always the same. In an era of intent by discovery, [Generative UI](https://www.uxtigers.com/post/generative-ui-google) will make the interface itself on the fly based on the user’s emerging context.  
我们习惯于静态界面，其中的控件（下拉菜单、菜单）始终相同。在一个通过发现形成意图的时代，生成式 UI 将根据用户不断变化的上下文动态生成界面本身。

If the AI detects that a user is exploring the mood of a generated piece of music or the logic of a database schema, it will dynamically spawn bespoke UI controls (custom sliders, visual node-graphs, or reference boards) just for that specific moment of discovery. Once the intent is locked in, those specific UI controls dissolve.  
如果 AI 检测到用户正在探索生成的音乐作品的氛围或数据库模式的逻辑，它将动态生成定制的 UI 控件（自定义滑块、可视化节点图或参考板），仅用于那一刻的发现。一旦意图确定，这些特定的 UI 控件就会消失。

## 5\. Curation as Intent 5. 策展即意图

Text is a low-bandwidth way to communicate complex ideas, vibes, or aesthetics. Intent by discovery will increasingly rely on multimodal curation, similar to Midjourney’s Mood Boards.  
文本是一种低带宽的沟通方式，用于传达复杂的思想、氛围或美学。通过发现形成意图将越来越依赖多模态策展，类似于 Midjourney 的情绪板。

Instead of typing out a description, a user might dump a cluster of disorganized artifacts onto a digital canvas: a PDF of a competitor’s report, a color palette from a photograph, and a 10-second voice memo. The system organizes them, finds the conceptual overlaps, and synthesizes a starting point. The user discovers their intent by seeing how the AI conceptually connects their fragmented inspirations.  
与其手动输入描述，用户可能会将一堆杂乱无章的素材倾倒在数字画布上：一份竞争对手的报告 PDF、一张照片中的调色板，以及一段 10 秒的语音备忘录。系统会整理这些素材，找出概念上的重叠之处，并综合出一个起点。用户通过观察 AI 如何将他们零散的灵感进行概念连接，从而发现自己的意图。

![](https://substackcdn.com/image/fetch/$s_!cbFM!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F05b9bf4b-f0cb-48be-afe0-e8bdf05b08a7_937x522.jpeg)

*As a Viking raider, you may discover that you like amber and arm rings by curating your preferred items from the loot. (NotebookLM)  
作为一名维京劫掠者，你可能会发现通过整理战利品中的你喜欢的物品，你会喜欢上琥珀和臂环。（NotebookLM）*

## 6\. Subtractive Sculpting 6. 减法式雕刻

The current prompting paradigm is *additive*: the user builds an outcome by adding more words. But discovery is often much easier when it is *subtractive*.  
当前的提示范式是加性的：用户通过添加更多词语来构建结果。但减法往往更容易发现。

Future AI UX will frequently rely on generating an overwhelming, maximalist version of an artifact (a hyper-detailed document, a complex piece of code, a busy design). The user’s interaction model is then based on deleting, striking through, and whittling away the parts they don’t want. It is infinitely easier for a human to edit and remove than to generate from a blank screen.  
未来的 AI 用户体验将频繁依赖于生成一个令人眼花缭乱、极尽奢华的工件版本（一份超详细文档、一段复杂的代码、一个繁忙的设计）。然后用户的交互模式是基于删除、划掉、精简他们不想要的那些部分。对于人类来说，编辑和删除比从空白屏幕开始生成要容易无穷倍。

![](https://substackcdn.com/image/fetch/$s_!Kqti!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F86e00f09-5b00-4c39-9249-7d86e84a3e4f_937x522.jpeg)

*Subtractive sculpting: start with something big and whittle away until only something much nicer remains. (NotebookLM)  
减法式雕刻：先从一个足够大的版本开始，再不断削去多余部分，直到只剩下更好的结果。（NotebookLM）*

## The Future Role of the UX Designer 用户体验设计师的未来角色

In this new paradigm, the role of the UX designer shifts dramatically. Instead of designing linear user flows (Screen A → Screen B → Screen C), designers will **architect** **possibility spaces**.  
在这个新的范式下，用户体验设计师的角色发生了巨大的转变。设计师不再设计线性的用户流程（屏幕 A→屏幕 B→屏幕 C），而是会构建可能性空间。

They will design the boundary constraints, the physics of the latent space, and the feedback loops of these generative environments. Prompt augmentation is a vital bridge for the present moment, but by fully embracing my vision of “intent by discovery,” the UX of the future will treat AI not as a command-line terminal disguised as a chat window, but as a fluid, co-navigational environment where the need to write a “prompt” eventually disappears entirely.  
他们将设计边界约束、潜在空间的物理特性和这些生成环境的反馈循环。提示增强是当前至关重要的桥梁，但通过完全拥抱我“通过发现实现意图”的愿景，未来的用户体验将不会将 AI 视为伪装成聊天窗口的命令行终端，而是一个流畅的、协同导航的环境，最终完全不需要编写“提示”。

Yet, we must be cautious about the industry’s obsession with the zero-learning ideal. A utopian vision where users merely express a wish and the AI seamlessly executes it offscreen carries a hidden cost. If users never need to learn how a system works, navigate a hierarchy, or make decisions, they suffer cognitive offloading and deskilling. They become mere passengers in their digital lives, trapped in a “Cognitive Atrophy Loop” in which analytical engagement degrades.  
然而，我们必须对行业对零学习理想的痴迷保持谨慎。这种乌托邦式的愿景，即用户只需表达愿望，而 AI 在幕后无缝执行，隐藏着代价。如果用户永远不需要学习系统如何工作、导航层级或做决定，他们就会遭受认知卸载和技能退化。他们变成了自己数字生活的乘客，陷入“认知萎缩循环”中，分析参与度不断下降。

![](https://substackcdn.com/image/fetch/$s_!qT_Q!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F40f69b1f-3915-4216-a3cc-d4ebec8fed5f_937x522.jpeg)

*If users have nothing to do, they risk cognitive atrophy from checking out and ignoring what goes on around them. (NotebookLM)  
如果用户无事可做，他们就会因为置身事外、忽视周围正在发生的事情而面临认知萎缩风险。（NotebookLM）*

This is the ultimate imperative for UX professionals. Our designs must not act as cognitive wheelchairs that replace human agency; they must act as cognitive exoskeletons that support and enhance human flourishing, even as traditional work vanishes. Good AI UX will teach *just enough*, reveal plan structures, and leave a comprehensible trail of action so users can maintain digital judgment.
这就是 UX 从业者面临的终极要求。我们的设计必须成为支持并增强人类能动性的认知外骨骼，即使传统工作逐渐消失也是如此。好的 AI UX 会教给用户恰到好处的知识，揭示计划结构，并留下可理解的行动轨迹，让用户持续保持数字判断力。

What disappears is the assumption that the human is executing the tedious steps. We are entering a complex era of managing autonomous chauffeurs. The winning designs of the next decade will be those that understand the job to be done, orchestrate the solution transparently across a triple-layered interface, demand friction where stakes are high, and preserve unmistakable moments of human authority.
真正消失的是“人类亲自执行繁琐步骤”这一前提。我们正在进入一个管理自主司机般代理系统的复杂时代。未来十年的优胜设计，会理解待完成工作，通过三层界面透明地编排解决方案，在高风险处主动加入摩擦，并保留清晰的人类授权时刻。

Designing that delicate relationship of delegation without surrender is the great UX challenge of the next decade. Let’s get started.
如何设计这种既能委派又不丧失主导权的微妙关系，将成为未来十年 UX 的重大挑战。现在就开始。

## Action Items 行动建议

If you’re designing AI interfaces now, here’s where to focus:
如果你现在就在设计 AI 界面，以下几个方向最值得优先投入：

- **Measure intent capture, not click efficiency.** Build evaluation frameworks around how accurately the system infers user goals, not how quickly users navigate menus that will no longer exist.
- **衡量意图捕获，而非点击效率。** 评估框架应围绕系统推断用户目标的准确度建立，而不是围绕用户穿过那些即将消失的菜单有多快。
- **Design the orchestration layer.** The negotiation surface between intent and action is where trust is built or lost. Most teams are ignoring it.
- **设计编排层。** 意图与行动之间的协商界面决定了信任是建立还是流失。大多数团队都忽略了这一层。
- **Choreograph friction deliberately.** Map your task inventory by stakes. For high-stakes irreversible actions, friction is not a design failure, it’s safety.
- **有意识地编排摩擦。** 按风险等级梳理任务清单。对于高风险且不可逆的动作，摩擦代表安全设计。
- **Plan for slow tasks from day one.** Run contracts, conceptual breadcrumbs, and salvage-value disclosure are not edge cases. They’re core interaction patterns for anything that runs longer than a few minutes.
- **从第一天起就为慢任务做设计。** 运行契约、概念性面包屑和残值披露都属于核心交互模式，适用于任何执行时间超过几分钟的任务。
- **Resist the zero-learning trap.** Design systems that keep users cognitively engaged with what the AI is doing and why. Delegation without understanding is not empowerment.
- **警惕零学习陷阱。** 系统设计要让用户持续理解 AI 在做什么以及为什么这样做。带着理解去委派，用户才真正拥有控制力。

The command-based paradigm served us magnificently for sixty years. The heuristics and usability guidelines we developed for it represent genuine intellectual achievement. But the world is shifting under our feet, and the UX profession must shift with it: not by abandoning what we know, but by recognizing that the definition of usability itself is being rewritten.
基于命令的范式在过去六十年里发挥了巨大作用。我们为它建立的启发式原则和可用性准则代表了真正的智识成果。如今世界正在变化，UX 这个职业也必须随之变化，通过承认可用性的定义本身正在被重写来完成这次转向。

![](https://substackcdn.com/image/fetch/$s_!3MAp!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd5906a7d-df91-4555-9c66-84af0b05ed0d_937x937.jpeg)

*Summary infographic. (NotebookLM)*

## About the Author 关于作者

Jakob Nielsen, Ph.D., is a usability pioneer with [43 years experience in UX](https://www.uxtigers.com/post/41-years-in-ux) and the Founder of [UX Tigers](https://www.uxtigers.com/). He founded the discount usability movement for fast and cheap iterative design, including heuristic evaluation and the [10 usability heuristics](https://www.uxtigers.com/post/10-heuristics-reimagined). He formulated the eponymous [Jakob’s Law of the Internet User Experience](https://www.uxtigers.com/post/jakobs-law). Named “the king of usability” by *Internet Magazine*, “the guru of Web page usability” by *The New York Times*, and “the next best thing to a true time machine” by *USA Today*.

Previously, Dr. Nielsen was a Sun Microsystems Distinguished Engineer and a Member of Research Staff at Bell Communications Research, the branch of Bell Labs owned by the Regional Bell Operating Companies. He is the author of 8 books, including the best-selling *Designing Web Usability: The Practice of Simplicity* (published in 22 languages), the foundational *Usability Engineering* ([30,073 citations in Google Scholar](https://scholar.google.com/citations?hl=en&user=y5uL3wUAAAAJ))*,* and the pioneering *Hypertext and Hypermedia* (published two years before the Web launched).

Dr. Nielsen holds 79 United States patents, mainly on making the Internet easier to use. He received the Lifetime Achievement Award for Human–Computer Interaction Practice from ACM SIGCHI and was named a “Titan of Human Factors” by the Human Factors and Ergonomics Society.

· Subscribe to [Jakob’s newsletter](https://jakobnielsenphd.substack.com/) to get the full text of new articles emailed to you as soon as they are published.

· [Follow Jakob on LinkedIn](http://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=jakobnielsenphd).

· Read: [article about Jakob Nielsen’s career in UX](https://www.uxtigers.com/post/41-years-in-ux)

· Watch: [Jakob Nielsen’s first 41 years in UX](https://www.youtube.com/watch?v=MPmVa_vKeF4) (8 min. video)
