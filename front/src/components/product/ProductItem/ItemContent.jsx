import {useSelector} from 'react-redux';
import ProductItemClient from '../ProductItemClient';
import ProductItemStaff from '../ProductItemStaff';
import ProductTitleAndImage from '../ProductTitleAndImage';

const ItemContent = ({item,
                      index,
                      place,
                      deleteChoosedProduct,
                      status,
                      isGrid}) => {
  const is_staff = useSelector(state => state.auth.is_staff)
  const product = item.product || item
  return(
    <>
      <ProductTitleAndImage product={product}
                            index={index}
                            isLarge={true}
                            isGrid={isGrid}/>
      {!is_staff ?
        <ProductItemClient product={product}
                           item={item}
                           index={index}
                           place={place}
                           deleteChoosedProduct={deleteChoosedProduct}
                           isGrid={isGrid}/>
      :
        <ProductItemStaff product={product}
                          index={index}
                          status={status}
                          deleteChoosedProduct={deleteChoosedProduct}
                          isGrid={isGrid}/>
      }
    </>
  )
}

export default ItemContent;
