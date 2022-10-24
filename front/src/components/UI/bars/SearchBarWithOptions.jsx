import {useFirstLoadingCheck} from '../../../hooks/useFirstLoadingCheck';
import {useSearchWithOptions} from '../../../hooks/useSearchWithOptions';
import {getReadableSelectOption} from '../../../utils/readable/readableSelectOption'
import FancyInput from './FancyInput';

const SearchBarWithOptions = ({searchQuery, setSearchQuery, fetchFunc}) => {
  const timeDelay = 1000
  const {search,
         inputValue,
         setInputValue,
         selectOptions,
         inputRef,
         listRef,
         optionOnSelect,
         optionOnHover,
         inputOnBlur} = useSearchWithOptions(searchQuery,
                                                setSearchQuery,
                                                fetchFunc,
                                                timeDelay)

  useFirstLoadingCheck(search, [inputValue])

  return(
    <FancyInput inputValue={inputValue}
                setInputValue={setInputValue}
                ref={inputRef}
                placeholder='Введите ФИО или имя не менее 2 символов'
                list=''
                role='combobox'
                onBlur={inputOnBlur}>
      <datalist ref={listRef}
                id='selectOptions'
                role='listbox'>
        {selectOptions.map((option, index) => {
          const value = getReadableSelectOption(option)
          return(
          <option value={value}
                  key={option.id}
                  data-value={option.id}
                  data-index={index}
                  onClick={() => optionOnSelect(value)}
                  onMouseOver={optionOnHover}
                  onMouseOut={optionOnHover}>
            {value}
          </option>)})}
      </datalist>
    </FancyInput>
  );
};

export default SearchBarWithOptions;
