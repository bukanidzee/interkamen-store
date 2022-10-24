import ItemContent from './ItemContent';
import RowOrColumnChoise from '../../UI/universal/RowOrColumnChoise';


const ProductItem = ({item,
                      index,
                      place,
                      deleteChoosedProduct,
                      status,
                      isGrid}) => {

  return(
    <RowOrColumnChoise isGrid={isGrid}>
      <ItemContent {...{item,
                        index,
                        place,
                        deleteChoosedProduct,
                        status,
                        isGrid}}/>
    </RowOrColumnChoise>
  )
}

export default ProductItem;
