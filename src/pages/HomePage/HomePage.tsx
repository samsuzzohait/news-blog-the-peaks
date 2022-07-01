import { useEffect } from 'react';
import CardList from '../../components/Cards/CardList';
import ContentTop from '../../components/ContentTop';
import Loader from '../../components/Loader';
import CategoryStories from './CategoryStories';
import useArticlesQuery from './hooks/useArticlesQuery';
import TopStories from './TopStories';

const HomePage = (): JSX.Element => {
  const { data, isLoading, request } = useArticlesQuery();

  useEffect(() => {
    request('newest');
  }, []);

  const handleSelectOrderBy = (orderBy: string) => {
    request(orderBy);
  };

  return (
    <>
      <ContentTop title="Top Stories" onSelectOrderBy={handleSelectOrderBy} />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {data?.news && <TopStories articles={data?.news.slice(0, 5)} />}
          {data?.news && <CardList articles={data?.news.slice(5)} />}
          {data?.sports && (
            <CategoryStories
              data={data.sports}
              title="Sports"
              section="sport"
            />
          )}
          {data?.culture && (
            <CategoryStories
              data={data.culture}
              title="Culture"
              section="culture"
            />
          )}
          {data?.lifeandstyle && (
            <CategoryStories
              data={data.lifeandstyle}
              title="Life and style"
              section="lifeandstyle"
            />
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
