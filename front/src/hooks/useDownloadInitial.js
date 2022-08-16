import {useEffect} from 'react';
import {useAPI} from './useAPI';

export const useDownloadInitial = (fetch, condition, setIsLoading) => {
  const getInitial = useAPI(fetch, setIsLoading)

  useEffect(() => {
    if (condition) {
      getInitial()
    }
  }, [condition])
}
