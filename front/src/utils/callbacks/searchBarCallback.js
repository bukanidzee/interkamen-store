export const searchBarCallback = (inputValue,
                                  searchQuery,
                                  setSearchQuery,
                                  getSelectOptions,
                                  setSelectOptions) =>
  async () => {
    if (inputValue.length >= 2) {
      await getSelectOptions()
    } else if (inputValue.length < 2){
      setSelectOptions([])
      if (searchQuery){
        setSearchQuery('')
      }
    }
}
