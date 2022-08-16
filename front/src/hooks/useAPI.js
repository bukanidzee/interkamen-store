import {useCallback} from 'react'
import {useAction} from '../hooks/useAction';
import timeout from '../utils/timeout';
import {handleFetchErrors} from '../utils/errors/handleErrors';

export const useAPI = (callback, setIsLoading) => {
    const {appendError, setOrder, logout} = useAction()
    const fetching = useCallback(async (...args) => {
      if (setIsLoading) {
        setIsLoading(true)
      }
      try {
        await Promise.all([timeout(500),
                           callback(...args)])
      } catch (err) {
        handleFetchErrors(err, appendError, setOrder, logout)
      }

      if (setIsLoading) {
        setIsLoading(false)
      }
    }, [callback])

    return fetching
}
