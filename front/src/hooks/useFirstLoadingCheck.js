import {useRef, useEffect, useCallback} from 'react'

export const useFirstLoadingCheck = (callback, checkConditionsArray) => {
  const isFirstLoading = useRef(true)

  const firstLoadingCheckAndCallback = useCallback(async () => {
      if (isFirstLoading.current) {
        isFirstLoading.current = false
        return
      }
      await callback()
  }, [isFirstLoading, callback])

  useEffect(() => {
    firstLoadingCheckAndCallback()
  }, checkConditionsArray)
}
