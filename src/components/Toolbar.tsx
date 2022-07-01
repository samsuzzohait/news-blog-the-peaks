import { css, Theme } from '@emotion/react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo/logo.svg';
import SearchBar from './SearchBar';

const styles = (theme: Theme) =>
  css({
    background: theme.color.primary,
    padding: '0 7rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    img: {
      width: '7rem',
      padding: '2rem 0',
      '@media (max-width: 768px)': {
        padding: '0.5rem 0',
      },
    },
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

const Toolbar = (): JSX.Element => {
  return (
    <header css={(theme) => styles(theme)}>
      <Link to="/">
        <img width="100%" height="100%" src={Logo} alt="logo" />
      </Link>
      <SearchBar />
    </header>
  );
};

export default Toolbar;
