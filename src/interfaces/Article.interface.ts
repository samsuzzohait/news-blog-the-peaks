export interface ArticleData {
  id: string;
  webTitle: string;
  webUrl?: string;
  webPublicationDate: string;
  apiUrl?: string;
  fields?: {
    trailText?: string;
    body?: string;
    main?: string;
  };
}
export interface ArticleResponse {
  response: {
    status: string;
    total: number;
    pageSize: number;
    pages: number;
    currentPage: number;
    orderBy: 'newest' | 'oldest';
    results: ArticleData[];
  };
}
