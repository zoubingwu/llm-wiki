function stripMarkdown(value: string): string {
  return value
    .replace(/!\[\[[^\]]+\]\]/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[\[([^[\]|]+)\|([^[\]]+)\]\]/g, "$2")
    .replace(/\[\[([^[\]]+)\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/`{1,3}([^`]+)`{1,3}/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function clampText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export function excerptFromMarkdown(body: string, maxLength = 180): string {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .filter((chunk) => !/^(#{1,6}\s|!\[\[|!\[|```)/.test(chunk))
    .map((chunk) => stripMarkdown(chunk))
    .filter(Boolean);

  return clampText(paragraphs[0] ?? "", maxLength);
}

export function normalizeWikilinkLabel(value: string): string {
  const match = value.match(/^\[\[([^[\]|]+)(?:\|([^[\]]+))?\]\]$/);
  if (!match) return value.trim();
  return (match[2] ?? match[1]).trim();
}
