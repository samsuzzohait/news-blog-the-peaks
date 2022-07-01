import axios from 'axios';
import Article from '../../../interfaces/ArticleDetails.interface';
import environment from '../../../environment';
import useApiWrapper, {
  ApiResponse,
} from '../../../hooks/useApiWrapper/useApiWrapper';

const fetcher = async (id: string): Promise<Article> => {
  const result = await axios.get<Article>(`${environment.BASE_URL}/${id}`, {
    params: {
      'api-key': environment.API_KEY,
      'show-fields': 'body,trailText,main',
    },
  });
  return result.data;
};

const useArticleQuery = (): ApiResponse<Article, string> => {
  return useApiWrapper<Article, string>((id) => fetcher(id));
};

export default useArticleQuery;
