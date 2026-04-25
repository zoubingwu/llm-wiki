# LLM Wiki

LLM Wiki 是一个由 Agent 维护的个人知识库模板。它把收集来的文章、图片附件和提炼后的 wiki 页面放在同一个仓库里，并用 Astro 发布成可浏览的网站。

这个仓库的核心目标很直接：把一次性阅读变成可持续维护的知识资产。你把资料放进来，让 Agent 执行 ingest，它会提取概念、实体、来源摘要和交叉引用，后续查询直接基于 `wiki/` 中的结构化知识进行综合。

## 目录结构

```text
llm-wiki/
├── articles/        # 已归档的源文章
├── raw/assets/      # 源文章里的图片等附件
├── wiki/            # Agent 生成和维护的 wiki 页面
├── src/             # Astro 网站源码
├── scripts/         # 构建辅助脚本
└── AGENTS.md        # Agent 维护规则
```

日常维护主要发生在三处：

- `articles/`：保存原始资料，英文原文作为权威来源。
- `raw/assets/`：保存文章附件，构建前会同步到站点静态目录。
- `wiki/`：保存可查询、可交叉引用、可持续更新的知识页。

## 本地运行

先安装依赖：

```bash
pnpm install
```

启动开发站点：

```bash
pnpm dev
```

构建生产版本：

```bash
pnpm build
```

运行检查：

```bash
pnpm check
pnpm test
```

## 如何录入资料

推荐流程：

1. 把源文章放进 `articles/`。
2. 把文章图片、附件等资源放进 `raw/assets/`。
3. 让 Agent 按 `AGENTS.md` 的 ingest 工作流处理新资料。
4. Agent 会更新 `wiki/*.md`、`wiki/index.md` 和 `wiki/log.md`。

一次 ingest 通常会产生多类页面：概念页、实体页、源摘要页和必要的分析页。wiki 页面之间使用 Obsidian 风格的 `[[wikilink]]` 互相连接。

## 复用这个项目

如果你希望把这个仓库改成自己的知识库，保留网站代码和 Agent 规则，清空当前示例资料，然后重新收集和 ingest 自己的内容即可。

建议清空这些内容：

```bash
rm -rf articles/*
rm -rf raw/assets/*
rm -f wiki/*.md
```

然后重建基础文件：

```bash
cat > wiki/index.md <<'EOF'
# Wiki Index

## 概念 Pages

## 实体

## 源摘要

## 分析 / 对比
EOF

cat > wiki/log.md <<'EOF'
# Wiki Log

Append-only 变更记录，最新在底部。
EOF
```

接着把你自己的资料放入 `articles/` 和 `raw/assets/`，再让 Agent 执行 ingest。`AGENTS.md` 已经定义了录入、查询和健康检查规则，复用时优先保留它。

## Agent 工作方式

这个仓库把 Agent 当成 wiki 管理员：

- ingest：读取源资料，提取知识，创建或更新 wiki 页面。
- query：先查 `wiki/index.md`，再综合相关页面回答问题。
- lint：检查矛盾、过时内容、孤立页面、缺失链接和重要缺页。

持久知识写入 `wiki/`，临时问答只留在对话里。值得长期保存的分析可以归档成新的 wiki 页面。

## 部署

项目包含 Cloudflare Workers Static Assets 配置，可以通过以下命令构建并部署：

```bash
pnpm deploy
```

部署前建议先运行：

```bash
pnpm build
```
