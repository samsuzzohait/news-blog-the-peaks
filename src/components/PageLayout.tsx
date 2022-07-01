import { css } from '@emotion/react';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Snackbar from './Snackbar';
import Toolbar from './Toolbar';

const styles = css({
  margin: '1rem auto',
  padding: '0 1rem',
  minHeight: '70vh',
  maxWidth: '1100px',
});

const PageLayout = (): JSX.Element => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Toolbar />
      <main css={styles}>
        <Outlet />
      </main>
      <Footer />
      <Snackbar />
    </>
  );
};
export default PageLayout;
