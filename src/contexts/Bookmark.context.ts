import { createContext, useContext } from 'react';
import { ArticleData } from '../interfaces/Article.interface';

export interface BookmarkContextState {
  bookmarks: ArticleData[];
  addBookmark: (article: ArticleData) => boolean;
  removeBookmark: (id: string) => boolean;
  checkIfBookmarked: (id: string) => boolean;
  sortBookmarkByDate: (orderBy?: string) => void;
}

const bookmarkDefaultState: BookmarkContextState = {
  bookmarks: [],
  addBookmark: () => true,
  removeBookmark: () => true,
  checkIfBookmarked: () => true,
  sortBookmarkByDate: () => {},
};
const context = createContext<BookmarkContextState>(bookmarkDefaultState);

const { Provider: BookmarkProvider } = context;
const useBookmarkContext = (): BookmarkContextState => useContext(context);

export { BookmarkProvider, useBookmarkContext };
