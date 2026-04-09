---
name: wiki-query
description: Answer questions from this repository-backed wiki. Use when the user asks about topics covered by the wiki, wants comparisons or synthesis from existing wiki pages, or asks questions that should be grounded in the maintained knowledge base rather than ad hoc recall. Read the repo AGENTS.md first, start from wiki/index.md, cite the wiki pages and source pages used, and suggest archiving the answer into wiki/ when the result is durable and worth keeping.
---

# Wiki Query

Read `AGENTS.md` in the repo root before answering. This skill assumes the wiki is the primary knowledge base.

## Workflow

1. Start from `wiki/index.md`.
Use the index to locate the most relevant pages first.

2. Read the minimum relevant set.
Open the directly related wiki pages, then source pages if needed for grounding or disambiguation.

3. Synthesize from the wiki, not from memory.
Prefer repository facts over model recall. If the wiki is missing something important, say so explicitly.

4. Cite what you used.
In the answer, mention the specific wiki pages and source pages that support the response.

5. Detect durable output.
If the answer produces a useful comparison, synthesis, taxonomy, or relationship that should persist, suggest archiving it as a new page under `wiki/`.

## Answer Style

Prioritize:
- direct answer first
- repository-grounded references second
- clear separation between what is explicit in the wiki and what is inference

When comparing concepts, prefer explicit contrasts over long summaries.

## When To Propose Writing Back

Suggest adding a new `wiki/` page when the response includes:
- a cross-source synthesis
- a comparison not already present
- a durable conclusion likely to be reused
- a cleaned-up explanation that resolves confusion in existing pages

Do not silently modify the wiki during a pure query unless the user asks for archival or editing.
