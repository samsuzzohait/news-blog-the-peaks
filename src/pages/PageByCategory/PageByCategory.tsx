import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardList from '../../components/Cards/CardList';
import ContentTop from '../../components/ContentTop';
import Loader from '../../components/Loader';
import useInfiniteScroll from '../../hooks/useInfiniteScroll/useInfiniteScroll';
import useSearchQuery from '../SearchResult/hooks/useSearchQuery/useSearchQuery';

const PageByCategory = (): JSX.Element => {
  const { category } = useParams<{ category: string }>();
  const { request, articles, setArticles, isLoading, hasMore } = useSearchQuery(
    category as string
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [orderBy, setOrderBy] = useState('newest');
  const mapper: { [key: string]: string } = {
    sport: 'Sports',
    culture: 'Culture',
    lifeandstyle: 'Life and style',
  };

  const loadMore = () => {
    setPageNumber(pageNumber + 1);
    request({
      pageNumber: pageNumber + 1,
      orderBy: orderBy,
    });
  };

  const { lastElementRef } = useInfiniteScroll(isLoading, hasMore, loadMore);

  useEffect(() => {
    setArticles([]);
    request({ orderBy });
  }, [orderBy]);

  const handleSelectOrderBy = (orderBy: string) => {
    setOrderBy(orderBy);
  };

  return (
    <>
      {category && (
        <ContentTop
          title={mapper[category]}
          onSelectOrderBy={handleSelectOrderBy}
        />
      )}
      <CardList articles={articles} lastElementRef={lastElementRef} />
      {isLoading && <Loader />}
    </>
  );
};
export default PageByCategory;
