import {useRef, useEffect} from 'react';
import {getExpectedCount} from '../utils/expectedCount';

const useObserver = (canLoad, callback, canSetObserver) => {
  const observer = useRef()
  const handleObserver = (ownRef) => {
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
  }
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
  }, array.length <= getExpectedCount(totalCount, page, 12))

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
