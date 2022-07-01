import { css } from '@emotion/react';
import { useEffect } from 'react';
import CardList from '../../components/Cards/CardList';
import ContentTop from '../../components/ContentTop';
import { useBookmarkContext } from '../../contexts/Bookmark.context';

const styles = css({
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.7)',
});

const Bookmarks = (): JSX.Element => {
  const { sortBookmarkByDate, bookmarks } = useBookmarkContext();

  useEffect(() => {
    sortBookmarkByDate();
  }, []);

  const handleSelectOrderBy = (orderBy: string) => {
    sortBookmarkByDate(orderBy);
  };

  return (
    <>
      <ContentTop
        title="All Bookmark"
        isBookmarkVisible={false}
        onSelectOrderBy={handleSelectOrderBy}
      />
      <CardList articles={bookmarks} />
      {bookmarks.length === 0 && (
        <h1 css={styles}>No bookmarked article found</h1>
      )}
    </>
  );
};
export default Bookmarks;
