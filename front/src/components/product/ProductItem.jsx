import {useMemo} from 'react';
import {useIsStaff} from '../../hooks/useAuthData';
import ProductItemClient from './ProductItemClient';
import ProductItemStaff from './ProductItemStaff';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ProductTitleAndImage from '../UI/ProductTitleAndImage';

const ProductItem = ({item,
                      index,
                      place,
                      deleteChoosedProduct,
                      status}) => {
  const is_staff = useIsStaff()
  const product = useMemo(() => {
    return item?.product || item
  }, [item])

  return(
    <Container className='product_item_card' fluid>
      <Row>
        <ProductTitleAndImage product={product} index={index}/>
        {!is_staff ?
          <ProductItemClient product={product}
                             item={item}
                             index={index}
                             place={place}
                             deleteChoosedProduct={deleteChoosedProduct}/>
        :
          <ProductItemStaff product={product}
                            index={index}
                            status={status}
                            deleteChoosedProduct={deleteChoosedProduct}/>
        }
      </Row>
    </Container>
  )
}

export default ProductItem;
