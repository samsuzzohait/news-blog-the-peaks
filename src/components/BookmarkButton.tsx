import { css, SerializedStyles } from '@emotion/react';
import BookMarkIcon from '../assets/icons/bookmark.svg';
import Button from './Button';

const buttonStyles = css({
  background: 'rgba(9, 53, 123, 1)',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  borderRadius: '4px',
  fontSize: '13px',
  padding: '5px 12px 4px 12px',
  cursor: 'pointer',
  '& img': {
    marginRight: '5px',
  },
  span: {
    fontFamily: 'Roboto',
    fontWeight: 500,
  },
});

interface Props {
  text: string;
  onClick: () => void;
  style?: SerializedStyles;
}

const BookmarkButton = ({
  text,
  onClick,
  style = css({}),
}: Props): JSX.Element => (
  <Button
    customStyles={css([buttonStyles, style])}
    type="button"
    onClick={onClick}
  >
    <img width="20px" height="100%" src={BookMarkIcon} alt="bookmark" />
    <span>{text.toUpperCase()}</span>
  </Button>
);
export default BookmarkButton;
