import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardList from '../../components/Cards/CardList';
import ContentTop from '../../components/ContentTop';
import Loader from '../../components/Loader';
import useInfiniteScroll from '../../hooks/useInfiniteScroll/useInfiniteScroll';
import useSearchQuery from './hooks/useSearchQuery/useSearchQuery';

const styles = css({
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.7)',
});

const SearchResult = (): JSX.Element => {
  const { request, articles, setArticles, isLoading, hasMore } =
    useSearchQuery('news');
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [orderBy, setOrderBy] = useState('newest');

  const loadMore = () => {
    setPageNumber(pageNumber + 1);
    request({
      searchKey: searchParams.get('q'),
      pageNumber: pageNumber + 1,
      orderBy: orderBy,
    });
  };

  const { lastElementRef } = useInfiniteScroll(isLoading, hasMore, loadMore);

  useEffect(() => {
    setArticles([]);
    request({ searchKey: searchParams.get('q'), orderBy });
  }, [searchParams.get('q'), orderBy]);

  const handleSelectOrderBy = (orderBy: string) => {
    setOrderBy(orderBy);
  };

  return (
    <>
      <ContentTop title="Search Result" onSelectOrderBy={handleSelectOrderBy} />
      <CardList articles={articles} lastElementRef={lastElementRef} />
      {!isLoading && articles.length === 0 && (
        <h1 css={styles}>No result found</h1>
      )}
      {isLoading && <Loader />}
    </>
  );
};
export default SearchResult;
