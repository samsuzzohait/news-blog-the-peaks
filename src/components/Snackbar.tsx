import { css, Theme, useTheme } from '@emotion/react';
import { useEffect } from 'react';
import BookmarkIcon from '../assets/icons/bookmark-outline.svg';
import { useSnackbarContext } from '../contexts/Snackbar.context';

const styles = (theme: Theme, type: string) =>
  css({
    background: type === 'success' ? theme.color.info : theme.color.danger,
    display: 'flex',
    fontFamily: 'Roboto',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100vw',
    color: '#fff',
    '& p': {
      padding: '10px 10px',
      margin: 0,
    },
  });

const Snackbar = (): JSX.Element => {
  const { show, type, title, hideSnackbar } = useSnackbarContext();
  const theme = useTheme();

  useEffect(() => {
    if (show) {
      const id = setInterval(() => hideSnackbar(), 1000);
      return () => clearInterval(id);
    }
  }, [show]);

  return (
    <>
      {show && (
        <div css={styles(theme, type)}>
          <img src={BookmarkIcon} alt="bookmark" />
          <p>{title}</p>
        </div>
      )}
    </>
  );
};
export default Snackbar;
