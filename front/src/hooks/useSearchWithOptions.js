import {setSearchQueryorSearchOptions} from '../utils/setSearchQueryorSearchOptions';
import {searchBarCallback} from '../utils/callbacks/searchBarCallback';
import {useRef, useState} from 'react';
import {useAPI} from './useAPI';

export const useSearchWithOptions = (searchQuery,
                                     setSearchQuery,
                                     fetchFunc,
                                     timeDelay) => {

  const [inputValue, setInputValue] = useState('');
  const [selectOptions, setSelectOptions] = useState([])
  const inputRef = useRef()
  const listRef = useRef()
  const currentFocus = useRef(-1)

  const getSelectOptions = useAPI(async () => {
    await fetchFunc(
      {'query': inputValue},
      (response) => {
        setSelectOptions(response)
      }
    )
  })

  const optionOnSelect = (value) => {
    setInputValue(value)
  }

  const optionOnHover = (event) => {
    if (event.type == 'mouseover') {
      currentFocus.current = event.target.dataset.index
    }
    if (event.type == 'mouseout') {
      currentFocus.current = -1
    }

  }

  const inputOnBlur = () => {
    if (currentFocus.current>-1) {
      listRef.current.options[currentFocus.current].click()
    }
  }

  const performSelectOptionsSearch = searchBarCallback(inputValue,
                                                       searchQuery,
                                                       setSearchQuery,
                                                       getSelectOptions,
                                                       setSelectOptions)

  const search = setSearchQueryorSearchOptions(performSelectOptionsSearch,
                                               setSearchQuery,
                                               inputValue,
                                               timeDelay,
                                               inputRef,
                                               listRef)

  return {search,
          inputValue,
          setInputValue,
          selectOptions,
          inputRef,
          listRef,
          optionOnSelect,
          optionOnHover,
          inputOnBlur}

}
