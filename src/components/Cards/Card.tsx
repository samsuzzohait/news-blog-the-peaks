import { css } from '@emotion/react';
import Logo from '../../assets/logo/logo.svg';

const styles = (titleLen: number, bottomLineColor?: string) =>
  css({
    width: '100%',
    height: '100%',
    position: 'relative',
    '& .image-wrap': {
      width: '100%',
      height: 'calc(100% - 3px)',
    },
    img: { objectFit: 'cover' },
    '& .defaultImg': {
      background: 'rgba(9, 53, 123, 0.9)',
      textAlign: 'center',
      img: { height: 'auto', paddingTop: '5rem' },
    },
    '& .text-wrapper': {
      position: 'absolute',
      bottom: '3px',
      background: 'rgba(9, 53, 123, 0.9)',
      padding: '10px',
      width: '100%',
      height: '35%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      header: {
        fontWeight: 700,
        lineHeight: '29px',
        letterSpacing: '0.07px',
        fontSize: '1em',
        color: '#fff',
      },
      '& p': {
        fontSize: '14px',
        color: '#fff',
        lineHeight: '20px',
        letterSpacing: '0.1px',
        margin: '5px 0',
        display: '-webkit-box',
        WebkitLineClamp:
          titleLen > 100 ? 1 : titleLen > 40 ? 2 : titleLen > 30 ? 3 : 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      },
    },
    hr: {
      position: 'relative',
      margin: 0,
      height: '3px',
      background: bottomLineColor ?? '#D32F2F',
      border: 'none',
    },
  });

interface Props {
  imgUrl?: string;
  title: string;
  body?: string;
  bottomLineColor?: string;
}

const Card = ({ imgUrl, title, body, bottomLineColor }: Props): JSX.Element => {
  return (
    <section css={styles(title.length, bottomLineColor)}>
      {imgUrl ? (
        <div className="image-wrap">
          <img width="100%" height="100%" src={imgUrl} alt="card" />
        </div>
      ) : (
        <div className="image-wrap defaultImg">
          <img width="60%" height="100%" src={Logo} alt="default" />
        </div>
      )}
      <article className="text-wrapper">
        <header>{title}</header>
        {body && title.length < 110 && (
          <p dangerouslySetInnerHTML={{ __html: body }}></p>
        )}
      </article>
      <hr></hr>
    </section>
  );
};
export default Card;
