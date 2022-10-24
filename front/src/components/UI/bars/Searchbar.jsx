import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import '../../../static/css/UI/searchbar.scss';
import FancyInput from './FancyInput';

const SearchBar = ({changeSearchQuery}) => {
  const [inputValue, setInputValue] = useState('');

  const returnInputValue = (e) => {
    e.preventDefault()
    changeSearchQuery(inputValue);
  }

  return(
    <form className='search-bar' onSubmit={returnInputValue}>
      <FancyInput inputValue={inputValue}
                  setInputValue={setInputValue}
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
