import { useCallback, useRef } from 'react';

const useInfiniteScroll = (
  isLoading: boolean,
  hasMore: boolean,
  loadMore: () => void
) => {
  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: unknown) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node as Element);
    },
    [isLoading, hasMore]
  );
  return { lastElementRef };
};

export default useInfiniteScroll;
