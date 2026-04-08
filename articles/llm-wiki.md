---
title: "llm-wiki"
source: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
author:
  - "karpathy"
published: 2026-04-04
created: 2026-04-08
description: "llm-wiki. GitHub Gist: instantly share code, notes, and snippets."
tags:
  - "articles"
---
## LLM Wiki

A pattern for building personal knowledge bases using LLMs.  
利用 LLM 构建个人知识库的模式。

This is an idea file, it is designed to be copy pasted to your own LLM Agent (e.g. OpenAI Codex, Claude Code, OpenCode / Pi, or etc.). Its goal is to communicate the high level idea, but your agent will build out the specifics in collaboration with you.  
这是一个思路说明文件，设计出来就是为了复制粘贴给你自己的 LLM Agent（例如 OpenAI Codex、Claude Code、OpenCode / Pi 等）。它的目标是传达高层思路，具体实现则由你的 agent 在与你协作的过程中逐步展开。

## The core idea 核心思想

Most people's experience with LLMs and documents looks like RAG: you upload a collection of files, the LLM retrieves relevant chunks at query time, and generates an answer. This works, but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation. Ask a subtle question that requires synthesizing five documents, and the LLM has to find and piece together the relevant fragments every time. Nothing is built up. NotebookLM, ChatGPT file uploads, and most RAG systems work this way.  
大多数人使用大语言模型（LLM）和文档的体验都类似于 RAG：你上传一系列文件，LLM 在查询时检索相关片段，并生成答案。这种方式虽然可行，但 LLM 每次都要从头开始重新发现知识，没有积累。如果你提出一个需要综合五个文档的复杂问题，LLM 每次都必须找到并拼凑相关的片段，没有任何知识积累。NotebookLM、ChatGPT 文件上传以及大多数 RAG 系统都是这样工作的。

The idea here is different. Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM doesn't just index it for later retrieval. It reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting where new data contradicts old claims, strengthening or challenging the evolving synthesis. The knowledge is compiled once and then *kept current*, not re-derived on every query.  
这里的想法不同。LLM 不是只在查询时从原始文档中检索信息，**而是持续构建并维护一个持久化 wiki**。这个 wiki 是一组结构化、相互链接的 Markdown 文件，位于你和原始资料之间。当你加入新来源时，LLM 不只是给它建立索引以备后查，而是会真正去读、提取关键信息，并把它整合进已有 wiki 中，更新实体页、修订主题摘要、标记新数据与旧说法的冲突，并强化或修正不断演化的综合结论。知识被整理一次，然后持续保持更新，而不是每次查询都重新推导。

This is the key difference: **the wiki is a persistent, compounding artifact.** The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read. The wiki keeps getting richer with every source you add and every question you ask.  
这就是关键区别：**wiki 是一个持续存在、不断累积的产物。** 交叉引用已经在那里，矛盾已经被标出来，综合结论已经吸收了你读过的内容。你每增加一个来源、每提出一个问题，wiki 都会变得更丰富。

You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it. You're in charge of sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, filing, and bookkeeping that makes a knowledge base actually useful over time. In practice, I have the LLM agent open on one side and Obsidian open on the other. The LLM makes edits based on our conversation, and I browse the results in real time — following links, checking the graph view, reading the updated pages. Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.  
你几乎不用亲自写 wiki，至少很少需要。所有内容都由 LLM 编写和维护。你负责找来源、做探索、提出正确的问题；LLM 负责那些繁琐但必要的工作，比如总结、交叉引用、归档和维护，这些工作会让知识库随着时间推移真正变得有用。实际使用时，我通常一边开着 LLM 代理，一边开着 Obsidian。LLM 会根据我们的对话编辑内容，我则实时浏览结果，点链接、看图谱、读更新后的页面。Obsidian 是 IDE，LLM 是程序员，wiki 是代码库。

This can apply to a lot of different contexts. A few examples:  
这可以应用于许多不同的情境。以下是一些例子：

- **Personal**: tracking your own goals, health, psychology, self-improvement — filing journal entries, articles, podcast notes, and building up a structured picture of yourself over time.  
	**个人** ：跟踪自己的目标、健康、心理、自我提升——记录日记、文章、播客笔记，并随着时间的推移构建一个结构化的自我形象。
- **Research**: going deep on a topic over weeks or months — reading papers, articles, reports, and incrementally building a comprehensive wiki with an evolving thesis.  
	**研究** ：对某个主题进行数周或数月的深入研究——阅读论文、文章、报告，并逐步构建一个包含不断发展的论点的综合维基。
- **Reading a book**: filing each chapter as you go, building out pages for characters, themes, plot threads, and how they connect. By the end you have a rich companion wiki. Think of fan wikis like [Tolkien Gateway](https://tolkiengateway.net/wiki/Main_Page) — thousands of interlinked pages covering characters, places, events, languages, built by a community of volunteers over years. You could build something like that personally as you read, with the LLM doing all the cross-referencing and maintenance.  
	**阅读一本书** ：你可以边读边归档每一章，为角色、主题、情节线索以及它们之间的联系建立页面。读到最后，你就会得到一个内容丰富的配套 wiki。可以把它想象成 [Tolkien Gateway](https://tolkiengateway.net/wiki/Main_Page) 这样的粉丝维基：成千上万个相互关联的页面，涵盖角色、地点、事件、语言等内容，由志愿者社区花很多年构建而成。你完全可以在自己的阅读过程中搭一个类似的东西，而 LLM 负责所有交叉引用和维护工作。
- **Business/team**: an internal wiki maintained by LLMs, fed by Slack threads, meeting transcripts, project documents, customer calls. Possibly with humans in the loop reviewing updates. The wiki stays current because the LLM does the maintenance that no one on the team wants to do.  
	**业务/团队** ：一个由 LLM 维护的内部 wiki，内容来源于 Slack 讨论串、会议记录、项目文档和客户电话。可能也会有人工参与审核更新。wiki 之所以能保持最新，是因为 LLM 负责团队中其他人都不愿意做的维护工作。
- **Competitive analysis, due diligence, trip planning, course notes, hobby deep-dives** — anything where you're accumulating knowledge over time and want it organized rather than scattered.  
	**竞争分析、尽职调查、旅行计划、课程笔记、兴趣爱好深度研究** ——任何需要你随着时间的推移积累知识，并且希望将其整理成册而不是散乱无章的事物。

## Architecture 架构

There are three layers:  
它分为三层：

**Raw sources** — your curated collection of source documents. Articles, papers, images, data files. These are immutable — the LLM reads from them but never modifies them. This is your source of truth.  
**原始资源** ——你精心整理的源文档集合，包括文章、论文、图片和数据文件。它们是不可变的：LLM 只读取，绝不修改。这是你的事实来源。

**The wiki** — a directory of LLM-generated markdown files. Summaries, entity pages, concept pages, comparisons, an overview, a synthesis. The LLM owns this layer entirely. It creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it; the LLM writes it.  
**维基** ——一个由 LLM 生成的 Markdown 文件目录，里面有摘要页、实体页、概念页、对比页、总览页和综合页。LLM 完全负责这一层：创建页面、在新来源到来时更新页面、维护交叉引用，并尽量保持整体一致。你来阅读，LLM 来写。

**The schema** — a document (e.g. CLAUDE.md for Claude Code or AGENTS.md for Codex) that tells the LLM how the wiki is structured, what the conventions are, and what workflows to follow when ingesting sources, answering questions, or maintaining the wiki. This is the key configuration file — it's what makes the LLM a disciplined wiki maintainer rather than a generic chatbot. You and the LLM co-evolve this over time as you figure out what works for your domain.  
**规范文件** ——一份文档（例如 Claude Code 的 `CLAUDE.md` 或 Codex 的 `AGENTS.md`），用来告诉 LLM 这个 wiki 的结构、约定，以及在 ingest source、回答问题、维护 wiki 时该遵循什么工作流。这是关键配置文件。正是它让 LLM 成为一个有纪律的 wiki 维护者，而不是泛泛的聊天机器人。随着你逐步摸索出适合自己领域的方法，你和 LLM 可以一起持续演化这份 schema。

## Operations 运营

**Ingest.** You drop a new source into the raw collection and tell the LLM to process it. An example flow: the LLM reads the source, discusses key takeaways with you, writes a summary page in the wiki, updates the index, updates relevant entity and concept pages across the wiki, and appends an entry to the log. A single source might touch 10-15 wiki pages. Personally I prefer to ingest sources one at a time and stay involved — I read the summaries, check the updates, and guide the LLM on what to emphasize. But you could also batch-ingest many sources at once with less supervision. It's up to you to develop the workflow that fits your style and document it in the schema for future sessions.  
**导入。** 你把新的 source 放进原始资料集合，然后让 LLM 处理。一个典型流程是：LLM 读取 source，与你讨论关键要点，在 wiki 中写摘要页，更新索引，更新相关实体页和概念页，并在日志中追加一条记录。单个 source 影响 10 到 15 个 wiki 页面很常见。我个人更喜欢一次 ingest 一个 source，并保持参与：我会读摘要、检查更新、告诉 LLM 哪些点更值得强调。但你也可以一次批量 ingest 多个 source，减少人工监督。适合你的工作流，需要你自己摸索，然后写进 schema 里，供后续会话沿用。

**Query.** You ask questions against the wiki. The LLM searches for relevant pages, reads them, and synthesizes an answer with citations. Answers can take different forms depending on the question — a markdown page, a comparison table, a slide deck (Marp), a chart (matplotlib), a canvas. The important insight: **good answers can be filed back into the wiki as new pages.** A comparison you asked for, an analysis, a connection you discovered — these are valuable and shouldn't disappear into chat history. This way your explorations compound in the knowledge base just like ingested sources do.  
**查询。** 您在维基中提出问题。LLM 会搜索相关页面，读取它们，并综合整理出包含引用的答案。答案可以根据问题的不同而呈现不同的形式——Markdown 页面、对比表格、幻灯片（Marp）、图表（matplotlib）或画布。重要的一点是： **优秀的答案可以作为新页面归档到维基中。** 您提出的对比、分析、发现的关联——这些都很有价值，不应该消失在聊天记录中。这样，您的探索就像已导入的资源一样，不断积累在知识库中。

**Lint.** Periodically, ask the LLM to health-check the wiki. Look for: contradictions between pages, stale claims that newer sources have superseded, orphan pages with no inbound links, important concepts mentioned but lacking their own page, missing cross-references, data gaps that could be filled with a web search. The LLM is good at suggesting new questions to investigate and new sources to look for. This keeps the wiki healthy as it grows.  
**定期检查。** 你可以定期让 LLM 给 wiki 做健康检查。重点看这些问题：页面之间是否互相矛盾，旧说法是否已被新来源推翻，是否存在没有入链的孤立页面，是否有被频繁提到却没有独立页面的重要概念，是否缺失交叉引用，以及是否存在需要靠网页检索补齐的数据空白。LLM 很擅长据此提出新的调查问题和新的来源建议，这能让 wiki 在增长过程中保持健康。

## Indexing and logging 索引和日志记录

Two special files help the LLM (and you) navigate the wiki as it grows. They serve different purposes:  
随着 wiki 不断增长，有两个特殊文件能帮助 LLM 和你一起更好地导航整个知识库。它们的用途不同：

**index.md** is content-oriented. It's a catalog of everything in the wiki — each page listed with a link, a one-line summary, and optionally metadata like date or source count. Organized by category (entities, concepts, sources, etc.). The LLM updates it on every ingest. When answering a query, the LLM reads the index first to find relevant pages, then drills into them. This works surprisingly well at moderate scale (~100 sources, ~hundreds of pages) and avoids the need for embedding-based RAG infrastructure.  
**index.md** 是面向内容的索引。它列出 wiki 中的所有页面，每个页面都有链接、一行摘要，以及可选的元数据，比如日期或来源数。它会按类别组织，例如实体、概念、来源等。LLM 每次 ingest 时都会更新它。在回答问题时，LLM 会先看索引找到相关页面，再进一步深入阅读。在中等规模下，这个方法出奇地有效，大概能覆盖 100 个来源、几百个页面的体量，同时还能避免引入基于 embedding 的 RAG 基础设施。

**log.md** is chronological. It's an append-only record of what happened and when — ingests, queries, lint passes. A useful tip: if each entry starts with a consistent prefix (e.g. `## [2026-04-02] ingest | Article Title`), the log becomes parseable with simple unix tools — `grep "^## \[" log.md | tail -5` gives you the last 5 entries. The log gives you a timeline of the wiki's evolution and helps the LLM understand what's been done recently.  
**log.md** 是按时间顺序组织的。它是一个 append-only 记录，记下发生了什么、何时发生，例如 ingest、query 和 lint。一个实用技巧是：如果每条记录都以统一前缀开头（例如 `## [2026-04-02] ingest | Article Title`），那么日志就能用简单的 Unix 工具解析，比如 `grep "^## \[" log.md | tail -5` 可以直接拿到最近 5 条记录。它提供了 wiki 的演进时间线，也帮助 LLM 理解最近做过什么。

## Optional: CLI tools 可选：命令行工具

At some point you may want to build small tools that help the LLM operate on the wiki more efficiently. A search engine over the wiki pages is the most obvious one — at small scale the index file is enough, but as the wiki grows you want proper search. [qmd](https://github.com/tobi/qmd) is a good option: it's a local search engine for markdown files with hybrid BM25/vector search and LLM re-ranking, all on-device. It has both a CLI (so the LLM can shell out to it) and an MCP server (so the LLM can use it as a native tool). You could also build something simpler yourself — the LLM can help you vibe-code a naive search script as the need arises.  
在某个阶段，你可能会想做一些小工具，帮助 LLM 更高效地操作 wiki。最直接的一个就是 wiki 页面搜索引擎。规模小时，索引文件就够了；但随着 wiki 变大，你会开始需要真正的搜索能力。[qmd](https://github.com/tobi/qmd) 是个不错的选择。它是本地 Markdown 文件搜索引擎，支持混合 BM25 / vector 搜索和 LLM 重排，全部在本地设备上完成。它同时提供 CLI 和 MCP server，前者让 LLM 能通过 shell 调用，后者让 LLM 能把它当作原生工具使用。你也可以自己做个更简单的版本，等需要时让 LLM 帮你快速写一个朴素搜索脚本也完全可行。

## Tips and tricks 技巧和窍门

- **Obsidian Web Clipper** is a browser extension that converts web articles to markdown. Very useful for quickly getting sources into your raw collection.  
	**Obsidian Web Clipper** 是一款浏览器扩展程序，可以将网页文章转换为 Markdown 格式。对于快速将资源添加到您的原始收藏中非常有用。
- **Download images locally.** In Obsidian Settings → Files and links, set "Attachment folder path" to a fixed directory (e.g. `raw/assets/`). Then in Settings → Hotkeys, search for "Download" to find "Download attachments for current file" and bind it to a hotkey (e.g. Ctrl+Shift+D). After clipping an article, hit the hotkey and all images get downloaded to local disk. This is optional but useful — it lets the LLM view and reference images directly instead of relying on URLs that may break. Note that LLMs can't natively read markdown with inline images in one pass — the workaround is to have the LLM read the text first, then view some or all of the referenced images separately to gain additional context. It's a bit clunky but works well enough.  
	**将图片下载到本地。** 在 Obsidian 设置 → 文件和链接中，将“附件文件夹路径”设置为一个固定目录（例如 `raw/assets/` ）。然后在设置 → 热键中，搜索“下载”，找到“下载当前文件的附件”并将其绑定到一个热键（例如 Ctrl+Shift+D）。剪辑文章后，按下热键，所有图片都会下载到本地磁盘。虽然此步骤是可选的，但非常实用——它允许 LLM 直接查看和引用图片，而无需依赖可能失效的 URL。请注意，LLM 无法一次性读取包含内联图片的 Markdown 文本——解决方法是让 LLM 先读取文本，然后单独查看部分或全部引用的图片以获取更多上下文信息。这种方法略显繁琐，但效果尚可。
- **Obsidian's graph view** is the best way to see the shape of your wiki — what's connected to what, which pages are hubs, which are orphans.  
	**Obsidian 的图谱视图** 是观察 wiki 结构最直观的方式。你可以一眼看出哪些内容彼此相连，哪些页面是枢纽，哪些页面是孤立的。
- **Marp** is a markdown-based slide deck format. Obsidian has a plugin for it. Useful for generating presentations directly from wiki content.  
	**Marp** 是一种基于 Markdown 的幻灯片格式。Obsidian 有对应插件，适合直接从 wiki 内容生成演示文稿。
- **Dataview** is an Obsidian plugin that runs queries over page frontmatter. If your LLM adds YAML frontmatter to wiki pages (tags, dates, source counts), Dataview can generate dynamic tables and lists.  
	**Dataview** 是一个 Obsidian 插件，用于对页面 frontmatter 进行查询。如果您的 LLM 系统向 wiki 页面添加了 YAML frontmatter（标签、日期、来源计数），Dataview 可以生成动态表格和列表。
- The wiki is just a git repo of markdown files. You get version history, branching, and collaboration for free.  
	这个 wiki 本质上就是一个存放 Markdown 文件的 Git 仓库。你天然就拥有版本历史、分支和协作能力。

## Why this works 为什么这种方法有效

The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Updating cross-references, keeping summaries current, noting when new data contradicts old claims, maintaining consistency across dozens of pages. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass. The wiki stays maintained because the cost of maintenance is near zero.  
维护知识库最烦人的部分不是阅读，也不是思考，而是记账式维护。更新交叉引用、保持摘要最新、记录新数据对旧说法的挑战、维持几十个页面之间的一致性，这些工作都很重要，但也最容易把人劝退。人们之所以放弃 wiki，往往不是因为它没价值，而是因为维护成本涨得比价值更快。LLM 不会觉得无聊，也不会忘记更新交叉引用，还能一次性改 15 个文件。wiki 之所以能持续维护，正是因为维护成本被压得非常低。

The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else.  
人的职责是筛选来源、引导分析、提出好问题，并思考这些内容的意义。LLM 的职责则是其他大部分工作。

The idea is related in spirit to Vannevar Bush's Memex (1945) — a personal, curated knowledge store with associative trails between documents. Bush's vision was closer to this than to what the web became: private, actively curated, with the connections between documents as valuable as the documents themselves. The part he couldn't solve was who does the maintenance. The LLM handles that.  
这个想法在精神上与 Vannevar Bush 在 1945 年提出的 Memex 很接近。Memex 是一个个人化、经过精心策展的知识存储系统，文档之间通过联想式路径连接。布什的愿景其实比后来的 Web 更接近这里的模式：私人的、主动维护的，而且文档之间的连接和文档本身一样有价值。他当年没法解决的问题是谁来维护；现在，这件事可以交给 LLM。

## Note 笔记

This document is intentionally abstract. It describes the idea, not a specific implementation. The exact directory structure, the schema conventions, the page formats, the tooling — all of that will depend on your domain, your preferences, and your LLM of choice. Everything mentioned above is optional and modular — pick what's useful, ignore what isn't. For example: your sources might be text-only, so you don't need image handling at all. Your wiki might be small enough that the index file is all you need, no search engine required. You might not care about slide decks and just want markdown pages. You might want a completely different set of output formats. The right way to use this is to share it with your LLM agent and work together to instantiate a version that fits your needs. The document's only job is to communicate the pattern. Your LLM can figure out the rest.  
本文档刻意保持抽象。它描述的是模式，而不是某个固定实现。具体的目录结构、规范约定、页面格式和工具，都取决于你的领域、偏好以及所选用的 LLM。上面提到的一切都是可选且模块化的。保留有用的部分，忽略无关的部分即可。比如你的来源可能全是纯文本，那就完全不需要处理图片；你的 wiki 可能很小，只靠索引文件就够，不需要搜索引擎；你可能也不关心幻灯片，只想生成 Markdown 页面；或者你想要一套完全不同的输出形式。正确的用法，是把它交给你的 LLM 代理，再一起把它具体化成适合你的版本。这个文档的任务只有一个：传达这个模式。其余细节，可以交给你的 LLM 去完成。
