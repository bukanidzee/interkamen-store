import {useCallback} from 'react'

export const useDeleteChoosedArrayElement = (array,
                                             setArray,
                                             choosed,
                                             setChoosed) => {
  const deleteChoosedElement = useCallback((index) => {
    let new_array = [...array]
    new_array.splice(index, 1)
    setChoosed(choosed + 1)
    setArray([...new_array])
  }, [array, choosed])

  return deleteChoosedElement
}
