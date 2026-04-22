export interface LogEntry {
  title: string;
  body: string[];
}

export interface ArticleListItem {
  title: string;
  created?: string | Date | null;
  published?: string | Date | null;
  mtime: number;
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
  const toTimestamp = (value: string | Date | null | undefined): number => {
    if (!value) return NaN;
    return value instanceof Date ? value.getTime() : Date.parse(String(value));
  };

  const toSortableValue = (entry: ArticleListItem): number => {
    const createdTimestamp = toTimestamp(entry.created);
    if (!Number.isNaN(createdTimestamp)) return createdTimestamp;

    const publishedTimestamp = toTimestamp(entry.published);
    if (!Number.isNaN(publishedTimestamp)) return publishedTimestamp;

    return entry.mtime;
  };

  return [...entries].sort((a, b) => toSortableValue(b) - toSortableValue(a));
}
