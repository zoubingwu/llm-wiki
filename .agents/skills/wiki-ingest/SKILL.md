---
name: wiki-ingest
description: Ingest a new source article into this repository-backed wiki. Use when the user asks to "ingest", "录入", "添加一篇新文章", "收录文章", or wants a new source converted into persistent wiki pages. Read the repo AGENTS.md first, update wiki pages instead of answering transiently, maintain index/log/cross-links, and if an English article contains Chinese machine translation, correct the Chinese translation in articles/ while preserving the English original.
---

# Wiki Ingest

Read `AGENTS.md` in the repo root before making changes. Treat it as the local schema.

## Workflow

1. Identify the new source.
Search `articles/` and `git status --short` to find newly added article files. Do not guess.

2. Read the source and inspect existing wiki coverage.
Open the article, `wiki/index.md`, `wiki/log.md`, and any obviously related pages before editing.

3. Extract durable knowledge.
Prefer persistent concepts, entities, source summaries, and cross-source relationships over ephemeral chat answers.

4. Update `articles/` only when the Chinese side needs correction.
If the article is English-first with Chinese translation:
- keep the English original intact
- fix Chinese machine translation problems that affect correctness or searchability
- prioritize terminology, titles, broken numbers, table headers, and obviously corrupted sentences
- do not "polish" the English into a rewrite

5. Create or update wiki pages.
Follow the page frontmatter and naming rules from `AGENTS.md`.
Use concise pages with durable facts, terminology in `中文（English）` form on first mention, and Obsidian `[[wikilink]]` references.

6. Update repository indexes.
Always update:
- `wiki/index.md`
- `wiki/log.md`

Update overview pages or related concept/entity pages when the new source materially changes them.

## Page Selection

Create a source page when ingesting a new article.

Create concept/entity/overview pages only when they represent reusable knowledge. Avoid over-splitting tiny concepts into many weak pages.

A single ingest may legitimately touch 10-15 pages if the source is dense.

## Chinese Translation Policy

When Chinese text appears alongside English source text:
- treat English as authoritative
- treat Chinese as potentially machine translated
- correct mistranslations of technical terms, headings, named entities, and damaged numeric facts
- keep terminology consistent with existing wiki usage when possible

Examples of high-value fixes:
- wrong title translations
- mistranslated model/architecture names
- broken table labels
- corrupted numeric claims
- malformed merged sentences

## Output Expectations

After edits, report:
- what source was ingested
- which wiki pages were created or updated
- whether Chinese machine translation in `articles/` was corrected

If you notice unrelated pre-existing gaps, mention them separately instead of folding them into the ingest unless the user asked for cleanup.
