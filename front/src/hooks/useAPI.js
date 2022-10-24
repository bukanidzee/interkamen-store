import {useAction} from '../hooks/useAction';
import timeout from '../utils/timeout';
import {handleFetchErrors} from '../utils/errors/handleErrors';

export const useAPI = (fetchFunc, setIsLoading) => {
    const {appendError, setOrder, logout} = useAction()
    const fetching = async (...args) => {
      if (setIsLoading) {
        setIsLoading(true)
      }
      try {
        await Promise.all([timeout(500),
                           fetchFunc(...args)])
      } catch (err) {
        handleFetchErrors(err, appendError, setOrder, logout)
      }

      if (setIsLoading) {
        setIsLoading(false)
      }
    }

    return fetching
}
