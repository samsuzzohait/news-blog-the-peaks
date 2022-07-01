import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setInput(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return input;
};

export default useDebounce;
