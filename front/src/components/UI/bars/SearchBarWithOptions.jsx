import {useState, useRef, useMemo} from 'react';
import {useAPI} from '../../../hooks/useAPI';
import {useFirstLoadingCheck} from '../../../hooks/useFirstLoadingCheck';
import {makeSearchDelay} from '../../../utils/makeSearchDelay';
import {getReadableSelectOption} from '../../../utils/readable/readableSelectOption'
import {searchBarCallback} from '../../../utils/callbacks/searchBarCallback';
import '../../../static/css/UI/searchbar.css';

const SearchBarWithOptions = ({searchQuery, setSearchQuery, fetchFunc}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectOptions, setSelectOptions] = useState([])

  const inputRef = useRef()

  const getSelectOptions = useAPI(async () => {
    await fetchFunc(
      {'query': inputValue},
      (response) => {
        setSelectOptions(response)
      }
    )
  })

  const callback = useMemo(() => {
    const initialCallback = searchBarCallback(inputRef,
                                              inputValue,
                                              searchQuery,
                                              setSearchQuery,
                                              getSelectOptions,
                                              setSelectOptions)
    const delayfunc = makeSearchDelay(initialCallback, inputValue, 1500)
    return async () => {
      await delayfunc(inputRef)
    }
  }, [inputValue])

  useFirstLoadingCheck(callback, [inputValue])

  return(
    <>
      <input type='text'
             className = 'search-input'
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             ref={inputRef}
             placeholder='Введите ФИО или имя не менее 2 символов'
             list='selectOptions'/>
      <datalist id="selectOptions">
        {selectOptions.map(option =>
          <option value={getReadableSelectOption(option)}
                  key={option.id}
                  data-value={option.id}/>)}
      </datalist>
    </>
  );
};

export default SearchBarWithOptions;


// const [inputValue, setInputValue] = useState('');
// const [selectOptions, setSelectOptions] = useState([])
// const [isOptionsLoading, setIsOptionsLoading] = useState(false)
//
// const inputRef = useRef()
//
// const getSelectOptions = useAPI(async () => {
//   await fetchFunc(
//     {'query': inputValue},
//     (response) => {
//       setSelectOptions(response)
//     }
//   )
// }, setIsOptionsLoading)
//
// const callback = useMemo(() => {
//   let initialCallback = searchBarCallback(inputRef,
//                                           inputValue,
//                                           searchQuery,
//                                           setSearchQuery,
//                                           getSelectOptions,
//                                           setSelectOptions)
//   return makeSearchDelay(initialCallback, 2000, inputValue)
// }, [inputValue])
//
// useFirstLoadingCheck(callback, [inputValue])
//
// return(
//   <>
//     <input type='text'
//            className = 'search-input'
//            value={inputValue}
//            onChange={(e) => setInputValue(e.target.value)}
//            ref={inputRef}
//            placeholder='Введите ФИО или имя пользователя, не менее 2 символов'
//            list='selectOptions'/>
//     <datalist id="selectOptions" onSelect={(e) => console.log(e)}>
//       <LoadingThenContent isLoading={isOptionsLoading}>
//         {selectOptions.map(option =>
//           <option value={getReadableSelectOption(option)}
//                   key={option.id}
//                   data-value={option.id}/>)}
//       </LoadingThenContent>
//     </datalist>
//   </>
// );
