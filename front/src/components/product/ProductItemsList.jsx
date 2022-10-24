import ProductItem from './ProductItem';
import ProductItemInfo from './ProductItemInfo';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import '../../static/css/components/productitemcard.scss';
import {useDeleteChoosedArrayElement} from '../../hooks/useDeleteChoosedArrayElement';
// import {useUserAgent} from '../../hooks/useUserAgent';
import {useProductGrid} from '../../hooks/useProductGrid';
import cn from 'classnames';


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


  const [productListRef, isGrid] = useProductGrid(items)

  // const multipleItems = items.length > 1
  const areItemsChangable = place ==='store' || place === 'current'
  // const {isProductCardMultiple, isProductCardBig} = useUserAgent()

  return (
    <div ref={productListRef}>
      <TransitionGroup
        className={cn({'product-items-grid': isGrid})}>
        {items.map((item, index) =>
          <CSSTransition key={item.product?.id || item.id}
                         timeout={500}
                         classNames="product-item-card">
            { areItemsChangable ?
              <ProductItem item={item}
                           index={index}
                           place={place}
                           deleteChoosedProduct={deleteChoosedProduct}
                           status={status}
                           isGrid={isGrid}/>
            :
              <ProductItemInfo item={item}
                               index={index}
                               isGrid={isGrid}/>
            }
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  )
}

export default ProductItemsList;
