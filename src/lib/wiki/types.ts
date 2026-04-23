export type WikiCollectionName = "wiki" | "articles";

export interface PageRecord {
  title: string;
  collection: WikiCollectionName;
  url: string;
}

export interface Registry {
  pages: Map<string, PageRecord>;
  pageAliases?: Map<string, PageRecord>;
  assets: Map<string, string>;
}
