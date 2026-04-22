export interface LogEntry {
  title: string;
  body: string[];
}

export interface ArticleListItem {
  title: string;
  date?: string;
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
  const toSortableValue = (entry: ArticleListItem): number => {
    const parsedDate = entry.date ? Date.parse(entry.date) : NaN;
    return Number.isNaN(parsedDate) ? entry.mtime : parsedDate;
  };

  return [...entries].sort((a, b) => toSortableValue(b) - toSortableValue(a));
}
