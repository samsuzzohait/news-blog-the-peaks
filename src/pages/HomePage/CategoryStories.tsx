import { Link } from 'react-router-dom';
import CardList from '../../components/Cards/CardList';
import { ArticleData } from '../../interfaces/Article.interface';

interface Props {
  data: ArticleData[];
  title: string;
  section: string;
}
const CategoryStories = ({ data, title, section }: Props): JSX.Element => {
  return (
    <>
      <Link to={`/category/${section}`}>
        <h1>{title}</h1>
      </Link>
      <CardList articles={data} />
    </>
  );
};
export default CategoryStories;
