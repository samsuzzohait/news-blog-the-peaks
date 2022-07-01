import { css, Theme, useTheme } from '@emotion/react';

const styles = (theme: Theme) =>
  css({
    width: '100%',
    height: 'calc(100% - 3px)',
    background: theme.color.primary,
    header: {
      padding: '10px',
      fontWeight: 700,
      lineHeight: '30px',
      fontSize: '1em',
      color: '#fff',
    },
  });

const hrStyle = (bottomLineColor?: string) =>
  css({
    position: 'relative',
    margin: 0,
    height: '3px',
    background: bottomLineColor ?? '#D32F2F',
    border: 'none',
  });

interface Props {
  title: string;
  bottomLineColor?: string;
}

const TitleCard = ({ title, bottomLineColor }: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <section css={styles(theme)}>
        <header>{title}</header>
      </section>
      <hr css={hrStyle(bottomLineColor)}></hr>
    </>
  );
};

export default TitleCard;
