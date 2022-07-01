import { css } from '@emotion/react';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside/useClickOutside';
import useDebounce from '../hooks/useDebounce/useDebounce';

const styles = css({
  position: 'relative',
  width: '4rem',
  height: '2rem',
  overflow: 'hidden',
  borderBottom: '2px solid #fff',
  transition: 'all 0.5s',
  '&.active': {
    width: '20rem',
    background: 'rgba(255, 255, 255, 0.1)',
    '& .input': { display: 'flex', '& input': { background: 'transparent' } },
  },
  '& .input': {
    position: 'relative',
    width: '90%',
    display: 'none',
    height: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    '& input': {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      width: '100%',
      height: '10px',
      border: 'none',
      outline: 'none',
      fontSize: '18px',
      padding: '15px 0',
      color: '#fff',
      boxSizing: 'border-box',
      paddingLeft: '10px',
      '&::placeholder': {
        color: '#bbb',
        fontSize: '13px',
      },
    },
  },
  '& .icon': {
    position: 'absolute',
    top: '0',
    right: '1rem',
    width: '2rem',
    height: '2rem',
    borderRadius: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    cursor: 'pointer',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '10px',
      height: '10px',
      border: '3px solid #fff',
      borderRadius: '50%',
      transform: 'translate(-2px, -2px)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '3px',
      height: '10px',
      background: '#fff',
      transform: 'translate(6px, 6px) rotate(315deg)',
    },
  },
});

const SearchBar = (): JSX.Element => {
  const [searchKey, setSearchKey] = useState<string | undefined>();
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, isClickOutside, reset } = useClickOutside();
  const debouncedSearchKey = useDebounce(searchKey ?? '', 1000);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchKey(q);
      setIsExpanded(true);
    }
  }, []);

  useEffect(() => {
    if (searchKey !== undefined) {
      navigate({
        pathname: '/search-result',
        search: createSearchParams({ q: debouncedSearchKey }).toString(),
      });
    }
  }, [debouncedSearchKey]);

  useEffect(() => {
    if (isClickOutside && !searchKey) {
      setIsExpanded(false);
    } else if (isClickOutside === true) {
      reset();
    }
  }, [isClickOutside]);

  const onButtonClick = () => {
    if (!isExpanded) {
      reset();
      setIsExpanded(true);
    } else if (!searchKey) {
      setIsExpanded(!isExpanded);
    } else if (debouncedSearchKey) {
      navigate({
        pathname: '/search-result',
        search: createSearchParams({ q: debouncedSearchKey }).toString(),
      });
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  return (
    <div
      ref={ref}
      css={styles}
      className={`search-bar ${isExpanded ? 'active' : ''}`}
    >
      <div className="input">
        <input
          ref={(input) => input && input.focus()}
          type="text"
          value={searchKey ?? ''}
          onChange={handleOnChange}
          placeholder="Search all news"
          autoFocus
        />
      </div>
      <div className="icon" onClick={onButtonClick}></div>
    </div>
  );
};

export default SearchBar;
