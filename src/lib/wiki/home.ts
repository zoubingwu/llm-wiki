export interface LogEntry {
  title: string;
  body: string[];
}

export interface ArticleListItem {
  title: string;
  created?: string | Date | null;
  published?: string | Date | null;
}

export interface WikiListItem {
  title: string;
  type?: string | null;
  created?: string | Date | null;
  updated?: string | Date | null;
}

const LATEST_WIKI_TYPES = new Set(["analysis", "concept", "entity", "overview"]);

function toTimestamp(value: string | Date | null | undefined): number {
  if (!value) return NaN;
  return value instanceof Date ? value.getTime() : Date.parse(String(value));
}

// 首页排序只依赖 frontmatter 里的日期，打平时按标题，且显式指定 zh-CN 排序规则
// （与 BrowseLayout 一致）。不要引入文件 mtime 之类依赖构建环境的信息：同一个 commit
// 在本地与 CI 上会因为文件时间戳不同而产出不同的首页顺序。
function compareTitles(a: string, b: string): number {
  return a.localeCompare(b, "zh-CN", { numeric: true });
}

export function pickFeaturedConcepts(indexBody: string, limit = 6): string[] {
  const conceptSection = indexBody.split(/^## /m).find((section) => section.startsWith("概念 Pages"));
  if (!conceptSection) {
    return [];
  }

  return [...conceptSection.matchAll(/- \[\[([^[\]|]+)\]\]/g)].map((match) => match[1]).slice(0, limit);
}

export function parseRecentLogEntries(logBody: string, limit = 8): LogEntry[] {
  return logBody
    .split(/^## /m)
    .filter(Boolean)
    .slice(1)
    .map((chunk) => {
      const [title, ...rest] = chunk.trim().split("\n");
      return { title, body: rest.filter((line) => line.length > 0) };
    })
    .reverse()
    .slice(0, limit);
}

export function sortLatestArticles(entries: ArticleListItem[]): ArticleListItem[] {
  const toSortableValue = (entry: ArticleListItem): number => {
    const createdTimestamp = toTimestamp(entry.created);
    if (!Number.isNaN(createdTimestamp)) return createdTimestamp;

    const publishedTimestamp = toTimestamp(entry.published);
    if (!Number.isNaN(publishedTimestamp)) return publishedTimestamp;

    return 0;
  };

  return [...entries].sort(
    (a, b) => toSortableValue(b) - toSortableValue(a) || compareTitles(a.title, b.title)
  );
}

export function sortLatestWikiEntries(entries: WikiListItem[]): WikiListItem[] {
  const toSortableValue = (entry: WikiListItem): number => {
    const updatedTimestamp = toTimestamp(entry.updated);
    if (!Number.isNaN(updatedTimestamp)) return updatedTimestamp;

    const createdTimestamp = toTimestamp(entry.created);
    if (!Number.isNaN(createdTimestamp)) return createdTimestamp;

    return 0;
  };

  return entries
    .filter((entry) => entry.type && LATEST_WIKI_TYPES.has(entry.type))
    .sort((a, b) => toSortableValue(b) - toSortableValue(a) || compareTitles(a.title, b.title));
}
