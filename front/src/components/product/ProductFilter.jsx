import SelectBar from '../UI/bars/SelectBar';
import SearchBar from '../UI/bars/Searchbar';
import '../../static/css/components/filter.css';

const ProductFilter = ({productFilter, setProductFilter}) => {

  return(
    <div className='filter'>
      <SelectBar defaultValue='Сортировка по'
                 options = {[{value: 'title', name:'Название'},
                             {value: 'prize', name:'Цена'}]}
                 value = {productFilter.sort}
                 onChange = {(s) => setProductFilter({...productFilter, sort:s})}/>
      <SearchBar changeSearchQuery={(q) => setProductFilter({...productFilter, query:q})}/>
    </div>
  )
}

export default ProductFilter
