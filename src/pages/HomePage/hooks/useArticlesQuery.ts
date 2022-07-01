import axios from 'axios';
import { useEffect, useState } from 'react';
import environment from '../../../environment';
import useApiWrapper from '../../../hooks/useApiWrapper/useApiWrapper';
import {
  ArticleData,
  ArticleResponse,
} from '../../../interfaces/Article.interface';
interface Articles {
  news: ArticleData[];
  sports: ArticleData[];
  culture: ArticleData[];
  lifeandstyle: ArticleData[];
}
const fetcher = async (
  orderBy: string,
  section: string,
  pageSize: number
): Promise<ArticleResponse> => {
  const result = await axios.get<ArticleResponse>(
    `${environment.BASE_URL}/${section}`,
    {
      params: {
        'order-by': orderBy,
        'api-key': environment.API_KEY,
        'show-fields': 'trailText,main',
        'page-size': pageSize,
        page: 1,
      },
    }
  );
  return result.data;
};
const useArticlesQuery = () => {
  const [data, setData] = useState<Articles>();
  const [isLoading, setIsLoading] = useState(false);
  const newsApi = useApiWrapper<ArticleResponse, string>((orderBy) =>
    fetcher(orderBy, 'news', 8)
  );
  const sportsApi = useApiWrapper<ArticleResponse, string>((orderBy) =>
    fetcher(orderBy, 'sport', 6)
  );
  const cultureApi = useApiWrapper<ArticleResponse, string>((orderBy) =>
    fetcher(orderBy, 'culture', 6)
  );
  const lifeandstyleApi = useApiWrapper<ArticleResponse, string>((orderBy) =>
    fetcher(orderBy, 'lifeandstyle', 6)
  );

  useEffect(() => {
    if (
      newsApi.data?.response.results &&
      sportsApi.data?.response.results &&
      cultureApi.data?.response.results &&
      lifeandstyleApi.data?.response.results
    ) {
      setData({
        news: newsApi.data.response.results,
        sports: sportsApi.data.response.results,
        culture: cultureApi.data?.response.results,
        lifeandstyle: lifeandstyleApi.data?.response.results,
      });
    }
  }, [newsApi.data, sportsApi.data, cultureApi.data, lifeandstyleApi.data]);

  useEffect(() => {
    if (
      newsApi.isLoading ||
      sportsApi.isLoading ||
      cultureApi.isLoading ||
      lifeandstyleApi.isLoading
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [
    newsApi.isLoading,
    sportsApi.isLoading,
    cultureApi.isLoading,
    lifeandstyleApi.isLoading,
  ]);

  const request = (orderBy: string) => {
    newsApi.request(orderBy);
    sportsApi.request(orderBy);
    cultureApi.request(orderBy);
    lifeandstyleApi.request(orderBy);
  };
  return { request, data, isLoading };
};

export default useArticlesQuery;
