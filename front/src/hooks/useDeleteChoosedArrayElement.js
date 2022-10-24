
export const useDeleteChoosedArrayElement = (array,
                                             setArray,
                                             choosed,
                                             setChoosed) => {
  const deleteChoosedElement = (index) => {
    let new_array = [...array]
    new_array.splice(index, 1)
    setChoosed(choosed + 1)
    setArray([...new_array])
  }

  return deleteChoosedElement
}
