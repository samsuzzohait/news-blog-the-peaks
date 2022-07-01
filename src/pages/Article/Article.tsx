import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookmarkButton from '../../components/BookmarkButton';
import Loader from '../../components/Loader';
import { useBookmarkContext } from '../../contexts/Bookmark.context';
import { useSnackbarContext } from '../../contexts/Snackbar.context';
import dateFormatter from './dateFormatter';
import useArticleQuery from './hooks/useArticleQuery';

const styles = css({
  '@media (max-width: 992px)': {
    margin: '0 8rem',
  },
  '@media (max-width: 768px)': {
    margin: '0 2rem',
  },
  '@media (max-width: 576px)': {
    margin: 0,
  },
  '> header': {
    width: '60%',
    '@media (max-width: 992px)': {
      width: '100%',
    },
    '& .date': {
      display: 'block',
      textDecoration: 'none',
      fontSize: '12px',
      lineHeight: '31px',
      letterSpacing: '0.83px',
      color: 'rgba(0, 0, 0, 0.87)',
      margin: '15px 0',
      fontFamily: 'Roboto',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& .title': {
      fontSize: '34px',
      lineHeight: '39px',
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.87)',
      margin: '10px 0',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& .subtitle': {
      fontSize: '20px',
      lineHeight: '26px',
      fontWeight: 'bold',
      letterSpacing: '0.07px',
      margin: '10px 0',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    '& .line': {
      opacity: '0.2',
      border: '1px solid #979797',
    },
  },
  '> main': {
    display: 'flex',
    '@media (max-width: 992px)': {
      flexDirection: 'column',
    },
    figcaption: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontFamily: 'Roboto',
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: '0.3px',
      opacity: '0.5',
    },
    '& .body': {
      flex: '0 0 60%',
      width: '60%',
      color: 'rgba(0, 0, 0, 0.87)',
      letterSpacing: '0.1px',
      lineHeight: '20px',
      fontFamily: 'Roboto',
      fontSize: '14px',
      '& a': {
        textDecoration: 'none',
        borderBottom: '1px solid #DCDCDC',
        color: '#C70000',
      },
      img: {
        width: '100%',
        height: 'auto',
      },
      iframe: {
        width: '100%',
        height: '17em',
      },
      '@media (max-width: 992px)': {
        order: 2,
        width: '100%',
        flex: '0 0 100%',
      },
    },
    '& .figure': {
      '& img': {
        width: '100%',
        height: 'auto',
      },
    },
  },
  '& .article-content': {
    display: 'flex',
    '& .body': {
      flex: '1 1 60%',
    },
    '& .main': {
      width: '300px',
    },
  },
});

const Article = (): JSX.Element => {
  const { request, data, isLoading } = useArticleQuery();
  const { checkIfBookmarked, addBookmark, removeBookmark } =
    useBookmarkContext();
  const { showSuccessMessage, showErrorMessage } = useSnackbarContext();
  const [isBookmarked, setIsBookmarked] = useState<boolean>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      request(id);
      setIsBookmarked(checkIfBookmarked(id));
    }
  }, [id]);

  const handleBookmarkClick = () => {
    if (isBookmarked && id) {
      const isSuccess = removeBookmark(id);
      if (isSuccess) {
        setIsBookmarked(false);
        showErrorMessage('removed from bookmarks'.toUpperCase());
      }
    } else if (!isBookmarked && id && data) {
      const isSuccess = addBookmark({
        id: id,
        webTitle: data.response.content.webTitle,
        webPublicationDate: data.response.content.webPublicationDate,
        fields: {
          main: data.response.content.fields?.main,
          trailText: data.response.content?.fields?.trailText,
        },
      });
      if (isSuccess) {
        setIsBookmarked(true);
        showSuccessMessage('saved to bookmarks'.toUpperCase());
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {data && (
        <article css={styles}>
          <header>
            <BookmarkButton
              text={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
              onClick={handleBookmarkClick}
            />
            <Link className="date" to="/category/sport">
              {dateFormatter(data.response.content.webPublicationDate)}
            </Link>
            <Link to="/category/culture" className="title">
              {data.response.content.webTitle}
            </Link>
            {data.response.content?.fields?.trailText && (
              <h4
                className="subtitle"
                dangerouslySetInnerHTML={{
                  __html: data.response.content?.fields?.trailText,
                }}
              />
            )}
            <hr className="line" />
          </header>
          <main>
            {data.response.content.fields?.body && (
              <section
                className="body"
                dangerouslySetInnerHTML={{
                  __html: data.response.content.fields.body,
                }}
              ></section>
            )}
            {data.response.content.fields?.main && (
              <section
                className="figure"
                dangerouslySetInnerHTML={{
                  __html: data.response.content.fields.main,
                }}
              ></section>
            )}
          </main>
        </article>
      )}
    </>
  );
};
export default Article;
