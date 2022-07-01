import { useState } from 'react';
import { ArticleData } from '../../interfaces/Article.interface';

const useBookmark = () => {
  const [bookmarks, setBookmarks] = useState<ArticleData[]>([]);

  const addBookmark = (article: ArticleData) => {
    if (bookmarks.some((bookmark) => bookmark.id === article.id)) {
      return false;
    } else {
      setBookmarks([...bookmarks, article]);
      return true;
    }
  };

  const removeBookmark = (id: string) => {
    const index = bookmarks.findIndex((bookmark) => bookmark.id === id);
    if (index !== undefined) {
      setBookmarks([
        ...bookmarks.slice(0, index),
        ...bookmarks.slice(index + 1),
      ]);
      return true;
    } else {
      return false;
    }
  };
  const checkIfBookmarked = (id: string) => {
    return bookmarks.some((bookmark) => bookmark.id === id);
  };

  const sortBookmarkByDate = (orderBy = 'newest') => {
    bookmarks.sort((a, b) => {
      const firstDate = new Date(a.webPublicationDate).getTime();
      const secondDate = new Date(b.webPublicationDate).getTime();
      return orderBy === 'oldest'
        ? firstDate - secondDate
        : secondDate - firstDate;
    });
    setBookmarks([...bookmarks]);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    checkIfBookmarked,
    sortBookmarkByDate,
  };
};
export default useBookmark;
