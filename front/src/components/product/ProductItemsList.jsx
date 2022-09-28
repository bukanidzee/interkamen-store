import ProductItem from './ProductItem';
import ProductItemInfo from './ProductItemInfo';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import '../../static/css/components/productitemcard.css';
import {useDeleteChoosedArrayElement} from '../../hooks/useDeleteChoosedArrayElement';
import {useUserAgent} from '../../hooks/useUserAgent';
import classnames from 'classnames';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

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
  const multipleItems = items.length > 1
  const widePlace = place ==='store' || place==='current'
  const {isProductCardMultiple} = useUserAgent()
  return (
    <TransitionGroup
      className={classnames({'product-items-grid': isProductCardMultiple &&
                                                   multipleItems &&
                                                   widePlace})}>

      {items.map((item, index) =>
        <CSSTransition key={item.product?.id || item.id}
                       timeout={500}
                       classNames="product_item_card">
          { widePlace ?
            <ProductItem item={item}
                         index={index}
                         place={place}
                         deleteChoosedProduct={deleteChoosedProduct}
                         status={status}
                         multipleItems={multipleItems}/>
          :
            <ProductItemInfo item={item}
                             index={index}/>
          }
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}

export default ProductItemsList;
