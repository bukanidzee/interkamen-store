import {useRef, useEffect} from 'react'

export const useFirstLoadingCheck = (callback, checkConditionsArray) => {
  const isFirstLoading = useRef(true)

  const firstLoadingCheckAndCallback = async () => {
      if (isFirstLoading.current) {
        isFirstLoading.current = false
        return
      }
      await callback()
  }

  useEffect(() => {
    firstLoadingCheckAndCallback()
  }, checkConditionsArray)
}
