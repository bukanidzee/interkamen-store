import timeout from './timeout';

export const setSearchQueryorSearchOptions = (search,
                                              setSearchQuery,
                                              inputValue,
                                              time,
                                              inputRef,
                                              listRef) =>
  async () => {
    for (let option of listRef.current.options){
      if (inputValue == option.value){
        setSearchQuery(option.dataset.value)
        return
      }
    }
    await timeout(time)
    if (inputRef.current.value === inputValue){
      await search()
    }
  }
