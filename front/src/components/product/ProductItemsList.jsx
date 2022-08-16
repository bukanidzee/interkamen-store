import ProductItem from './ProductItem';
import ProductItemInfo from './ProductItemInfo';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import '../../static/css/components/productitemcard.css';
import {useDeleteChoosedArrayElement} from '../../hooks/useDeleteChoosedArrayElement';

const ProductItemsList = ({items,
                           place,
                           setProducts,
                           setChoosed,
                           choosed,
                           status}) => {
  const deleteChoosedProduct = useDeleteChoosedArrayElement(items,
                                                            setProducts,
                                                            choosed,
                                                            setChoosed)

  return (
    <TransitionGroup>
      {items.map((item, index) =>
        <CSSTransition
                    key={item.product?.id || item.id}
                    timeout={500}
                    classNames="product_item_card">
          {place ==='store' || place==='current' ?
            <ProductItem
                       item={item}
                       index={index}
                       place={place}
                       deleteChoosedProduct={deleteChoosedProduct}
                       status={status}/>
            :
            <ProductItemInfo
                       item={item}
                       index={index}/>
          }
        </CSSTransition>
    )}
    </TransitionGroup>
  )
}

export default ProductItemsList;
