import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Card from '../../components/Cards/Card';
import TitleCard from '../../components/Cards/TitleCard';
import { ArticleData } from '../../interfaces/Article.interface';

const styles = css({
  display: 'flex',
  '@media (max-width: 768px)': {
    flexWrap: 'wrap',
  },
  '& .top-news': {
    flex: '0 0 49%',
    height: '400px',
    width: '540px',
    fontSize: '24px',
    '@media (max-width: 768px)': {
      flex: '0 0 100%',
    },
  },
  '& .right-top-section': {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    fontSize: '18px',
    '& a:nth-of-type(2n)': {
      marginRight: 0,
    },
    '& .right-top-top-news': {
      width: '255px',
      height: '260px',
      flex: '1 1 40%',
    },
    '& .right-top-bottom-news': {
      width: '255px',
      height: '125px',
      flex: '1 1 40%',
    },
  },
  '& a': {
    flex: '1 0 30%',
    textDecoration: 'none',
    margin: '0 15px 15px 0',
    fontSize: '20px',
    '@media (max-width: 768px)': {
      width: '300px',
      flex: '1 1 50%',
    },
  },
});

interface Props {
  articles: ArticleData[];
}

const TopStories = ({ articles }: Props): JSX.Element => {
  const imageSrc = (html?: string) => {
    if (html) {
      const regex = /<img.*?src="(.*?)"/;
      return regex.exec(html)?.[1];
    }
    return '';
  };

  return (
    <section css={styles}>
      {articles.slice(0, 1).map((article) =>
        article ? (
          <Link
            to={`/article/${encodeURIComponent(article.id)}`}
            className="top-news"
            key={article.id}
          >
            <Card
              title={article.webTitle}
              imgUrl={imageSrc(article.fields?.main)}
              body={article?.fields?.trailText}
              bottomLineColor="#388E3C"
            />
          </Link>
        ) : (
          <></>
        )
      )}
      <section className="right-top-section">
        {articles.slice(1, 3).map((article, index) =>
          article ? (
            <Link
              to={`/article/${encodeURIComponent(article.id)}`}
              className="right-top-top-news"
              key={article.id}
            >
              <Card
                title={article.webTitle}
                imgUrl={imageSrc(article.fields?.main)}
                bottomLineColor={index === 1 ? '#FFC107' : '#D32F2F'}
              />
            </Link>
          ) : (
            <></>
          )
        )}
        {articles.slice(3, 5).map((article, index) =>
          article ? (
            <Link
              to={`/article/${encodeURIComponent(article.id)}`}
              className="right-top-bottom-news"
              key={article.id}
            >
              <TitleCard
                title={article.webTitle}
                bottomLineColor={index === 0 ? '#2196F3' : '#388E3C'}
              />
            </Link>
          ) : (
            <></>
          )
        )}
      </section>
    </section>
  );
};
export default TopStories;
