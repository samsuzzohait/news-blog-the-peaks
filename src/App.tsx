import { css, Global, ThemeProvider } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/PageLayout';
import theme from './config/theme';
import { BookmarkProvider } from './contexts/Bookmark.context';
import { SnackbarProvider } from './contexts/Snackbar.context';
import useBookmark from './hooks/useBookmark/useBookmark';
import useSnackbar from './hooks/useSnackbar/useSnackbar';
import Article from './pages/Article/Article';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import HomePage from './pages/HomePage/HomePage';
import PageByCategory from './pages/PageByCategory/PageByCategory';
import SearchResult from './pages/SearchResult/SearchResult';

const styles = css({
  body: {
    margin: '0',
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    boxSizing: 'border-box',
  },
  code: {
    fontFamily:
      "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
});

const App = (): JSX.Element => {
  const bookmark = useBookmark();
  const snackbar = useSnackbar();

  return (
    <ThemeProvider theme={theme}>
      <Global styles={styles} />
      <BrowserRouter>
        <SnackbarProvider value={snackbar}>
          <BookmarkProvider value={bookmark}>
            <Routes>
              <Route path="" element={<MainLayout />}>
                <Route path="" element={<HomePage />} />
                <Route path="article/:id" element={<Article />} />
                <Route path="bookmarks" element={<Bookmarks />} />
                <Route path="search-result" element={<SearchResult />} />
                <Route path="category/:category" element={<PageByCategory />} />
              </Route>
            </Routes>
          </BookmarkProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
