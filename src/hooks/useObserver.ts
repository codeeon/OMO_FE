import { RefObject, useEffect, useState } from 'react';

const useObserver = (
  elementRef: RefObject<Element>, // 감시할 타겟
  { threshold = 0.1, root = null, rootMargin = '0%' }, //option 값
) => {
  // 영역
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  // 영역 업데이트
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver; // intersectionObserver 지원하는지 확인

    if (!node || !hasIOSupport) return;

    const observerParams = { threshold, root, rootMargin };
    
    // observer 생성
    const observer = new IntersectionObserver(updateEntry, observerParams);

    // 감시 시작
    observer.observe(node);

    // 클린업
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)]);

  return entry;
};

export default useObserver;
