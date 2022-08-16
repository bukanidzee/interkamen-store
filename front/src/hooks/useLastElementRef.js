import {useRef, useEffect, useCallback} from 'react';
import {getExpectedCount} from '../utils/expectedCount';

const useObserver = (canLoad, callback, canSetObserver) => {
  const observer = useRef()
  const handleObserver = useCallback((ownRef) => {
    if (observer.current) observer.current.disconnect();
    function makeCallback(entries) {
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    }
    if (canSetObserver) {
      observer.current = new IntersectionObserver(makeCallback);
      observer.current.observe(ownRef.current);
    }
  }, [observer, canLoad, callback, canSetObserver])
  return handleObserver;
}

export const useLastElementRef = (page,
                                  setPage,
                                  totalPages,
                                  totalCount,
                                  array,
                                  listOfConditions) => {
  const lastElement = useRef()

  const handleObserver = useObserver(page<totalPages, () => {
    setPage(page + 1);
  }, array.length <= getExpectedCount(totalCount, page, 10))

  useEffect(() => {
    for (let condition of listOfConditions){
      if (condition) {
        return
      }
    }
    if (lastElement.current) {
      handleObserver(lastElement)
    }
  }, listOfConditions)

  return lastElement
}
