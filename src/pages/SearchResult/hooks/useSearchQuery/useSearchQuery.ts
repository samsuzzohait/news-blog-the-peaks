import axios, { Canceler } from 'axios';
import { useEffect, useState } from 'react';
import environment from '../../../../environment';
import useApiWrapper from '../../../../hooks/useApiWrapper/useApiWrapper';
import {
  ArticleData,
  ArticleResponse,
} from '../../../../interfaces/Article.interface';

interface QueryParams {
  pageSize?: number;
  pageNumber?: number;
  orderBy?: string;
  searchKey?: string | null;
  section?: string;
}

interface Params {
  [key: string]: string | number;
}

const CancelToken = axios.CancelToken;
let cancel: Canceler;

const fetcher = async (
  {
    pageSize = 15,
    pageNumber = 1,
    orderBy = 'newest',
    searchKey = '',
  }: QueryParams,
  section: string
): Promise<ArticleResponse> => {
  const params: Params = {
    section: section,
    page: pageNumber,
    'page-size': pageSize,
    'order-by': orderBy,
    'show-fields': 'trailText,main',
    'api-key': environment.API_KEY as string,
  };
  if (searchKey) params.q = searchKey;
  const result = await axios.get<ArticleResponse>(
    `${environment.BASE_URL}/search`,
    {
      params,
      cancelToken: new CancelToken((c) => (cancel = c)),
    }
  );
  cancel();
  return result.data;
};

const useSearchQuery = (section: string) => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const { data, request, isLoading, error } = useApiWrapper<
    ArticleResponse,
    QueryParams
  >((queryParams) => fetcher(queryParams, section));

  useEffect(() => {
    if (data) {
      setArticles(Array.from(new Set([...articles, ...data.response.results])));
      setHasMore(data.response.pages > data.response.currentPage);
    }
  }, [data]);

  return { request, isLoading, error, articles, setArticles, hasMore };
};

export default useSearchQuery;
