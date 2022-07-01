import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { ArticleData } from '../../interfaces/Article.interface';
import Card from './Card';

const styles = css({
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
  flexWrap: 'wrap',

  '& a': {
    flex: '0 1 calc(33% - 7px)',
    minWidth: '300px',
    margin: '0 15px 15px 0',
    height: '350px',
    fontSize: '20px',
    '&:nth-of-type(3n)': {
      marginRight: 0,
    },
    '@media (max-width: 992px)': {
      flex: '0 1 calc(50% - 15px)',
      '&:nth-of-type(2n)': {
        marginRight: 0,
      },
      '&:nth-of-type(3n)': {
        marginRight: '15px',
      },
    },
    '@media (max-width: 768px)': {
      flex: '0 1 100%',
      justifySelf: 'center',
      marginRight: 0,
      '&:nth-of-type(2n)': {
        marginRight: 0,
      },
      '&:nth-of-type(3n)': {
        marginRight: 0,
      },
    },
  },
});

interface Props {
  articles: ArticleData[];
  lastElementRef?: (node: unknown) => void;
}

const CardList = ({ articles, lastElementRef }: Props): JSX.Element => {
  const imageSrc = (html?: string) => {
    if (html) {
      const regex = /<img.*?src="(.*?)"/;
      return regex.exec(html)?.[1];
    }
    return '';
  };

  return (
    <section css={styles}>
      {articles.map((article, i) => (
        <Link
          to={`/article/${encodeURIComponent(article.id)}`}
          className={`card-wrapper`}
          key={article.id}
          ref={
            articles.length === i + 1 && lastElementRef ? lastElementRef : null
          }
        >
          <Card
            title={article.webTitle}
            imgUrl={imageSrc(article.fields?.main)}
            body={article?.fields?.trailText}
          />
        </Link>
      ))}
    </section>
  );
};

export default CardList;
