export const searchBarCallback = (inputRef,
                                  inputValue,
                                  searchQuery,
                                  setSearchQuery,
                                  getSelectOptions,
                                  setSelectOptions) =>
  async () => {
    if (inputRef.current){
      for (let option of inputRef.current.list.options){
        if (inputValue == option.value){
          setSearchQuery(option.dataset.value)
          return
        }
      }
    }
    if (inputValue.length >= 2) {
      await getSelectOptions()
    } else if (inputValue.length < 2){
      setSelectOptions([])
      if (searchQuery){
        setSearchQuery('')
      }
    }
}
