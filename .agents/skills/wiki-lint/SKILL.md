---
name: wiki-lint
description: Audit this repository-backed wiki for structural and content health. Use when the user asks for a lint, health check, consistency review, stale-content scan, orphan-page check, missing cross-links review, or wants to know what in the wiki is contradictory or incomplete. Read the repo AGENTS.md first, scan wiki/ systematically, and report contradictions, stale claims, orphan pages, missing important pages, and missing wikilinks with concrete file-level references.
---

# Wiki Lint

Read `AGENTS.md` in the repo root before scanning. Use its schema as the standard.

## Required Checks

Scan `wiki/` and report:
- contradictory statements across pages
- outdated content superseded by newer sources
- orphan pages with no meaningful inbound links
- important concepts/entities mentioned repeatedly but lacking their own page
- missing cross-links between closely related pages

## Workflow

1. Inspect `wiki/index.md` and `wiki/log.md`.
Understand current coverage and recent changes before reporting problems.

2. Build a lightweight map of pages and links.
Use repository search to find:
- pages with no inbound links
- repeated mentions without target pages
- inconsistent terminology

3. Validate against sources when needed.
If a claim looks stale or inconsistent, check the corresponding source page or source article before calling it out.

4. Report findings first.
Order by severity and usefulness. Prefer concrete, actionable findings over vague observations.

## Reporting Style

For each finding include:
- problem type
- affected page(s)
- why it matters
- recommended fix

If there are no meaningful findings, say so explicitly and note any residual weak spots such as sparse cross-linking or missing source pages.

## Scope Control

Do not rewrite the wiki during lint unless the user explicitly asks for fixes.
Keep lint focused on repository health, not on generic prose style preferences.
