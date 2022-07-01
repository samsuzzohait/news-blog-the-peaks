import { css, keyframes, SerializedStyles } from '@emotion/react';
import { useEffect, useState, MouseEvent, type PropsWithChildren } from 'react';
const kf = keyframes({
  '0%': { transform: 'scale(1)', opacity: 1 },
  '50%': { transform: 'scale(10)', opacity: 0.375 },
  '100%': { transform: 'scale(35)', opacity: 0 },
});
const styles = css({
  borderRadius: '4px',
  border: 'none',
  padding: '14px 24px',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  '& .content': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& > .ripple': {
    width: '20px',
    height: '20px',
    position: 'absolute',
    background: '#4370b9',
    display: 'block',
    content: '""',
    borderRadius: '9999px',
    opacity: 1,
    animation: `0.8s ease 1 forwards ${kf}`,
  },
  '& > .content': { position: 'relative', zIndex: 2 },
});

interface Props {
  customStyles?: SerializedStyles;
  type: 'button' | 'reset' | 'submit';
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  onClick,
  type,
  customStyles,
}: PropsWithChildren<Props>): JSX.Element => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    onClick?.(event);
  };

  return (
    <button
      type={type}
      css={css([styles, customStyles])}
      onClick={handleClick}
      className="ripple-button"
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ''
      )}
      <span className="content">{children}</span>
    </button>
  );
};

export default Button;
