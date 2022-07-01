import { css, keyframes } from '@emotion/react';

const kf = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});
const styles = {
  container: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  loader: css({
    border: '4px solid #f3f3f3',
    borderTop: '4px solid rgba(9, 53, 123, 1)',
    borderRadius: '50%',
    width: '4rem',
    height: '4rem',
    animation: `${kf} 1s linear infinite`,
  }),
};
const Loader = () => {
  return (
    <article css={styles.container}>
      <div css={styles.loader}></div>
    </article>
  );
};
export default Loader;
