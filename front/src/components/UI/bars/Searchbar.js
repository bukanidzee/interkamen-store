import {useState, useCallback} from 'react';
import Button from 'react-bootstrap/Button';
import '../../../static/css/UI/searchbar.css';

const SearchBar = ({changeSearchQuery}) => {
  const [inputValue, setInputValue] = useState('');

  const returnInputValue = useCallback((e) => {
    e.preventDefault()
    changeSearchQuery(inputValue);
  }, [changeSearchQuery, inputValue])

  return(
    <form className='search-bar' onSubmit={returnInputValue}>
      <input type='text'
             className = 'search-input'
             value={inputValue}
             onChange={(event) => setInputValue(event.target.value)}
             placeholder='Введите запрос'/>
      <Button
        className = 'search-button'
        variant="outline-secondary"
        type='submit'>
        Найти
      </Button>
    </form>
  );
};

export default SearchBar;
