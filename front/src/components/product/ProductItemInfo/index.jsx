import RowOrColumnChoise from '../../UI/universal/RowOrColumnChoise';
import RowInfo from './RowInfo';
import ColInfo from './ColInfo';
import ProductTitleAndImage from '../ProductTitleAndImage';

const ProductItemInfo = ({item, index, isGrid}) => {

  return(
      <RowOrColumnChoise isGrid={isGrid}>
        <ProductTitleAndImage product={item.product}
                              index={index}
                              isLarge={false}
                              isGrid={isGrid}/>
        {!isGrid ?
          <RowInfo item={item}/>
        :
          <ColInfo item={item}/>}
      </RowOrColumnChoise>
  )
}

export default ProductItemInfo;
