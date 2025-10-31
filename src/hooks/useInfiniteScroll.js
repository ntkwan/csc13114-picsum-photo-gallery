import { useState, useEffect, useCallback, useRef } from 'react';

export const useInfiniteScroll = (fetchMore) => {
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData();
  }, [isFetching]);

  const fetchMoreData = useCallback(async () => {
    try {
      const hasMoreData = await fetchMore();
      setHasMore(hasMoreData);
    } catch (error) {
      console.error('error fetching more data:', error);
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, [fetchMore]);

  const lastElementRef = useCallback((node) => {
    if (isFetching) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setIsFetching(true);
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [isFetching, hasMore]);

  return { isFetching, hasMore, lastElementRef };
};
