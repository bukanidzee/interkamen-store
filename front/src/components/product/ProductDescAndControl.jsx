import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {useIsStaff} from '../../hooks/useAuthData';
import ProductDescClient from './ProductDescClient'
import ProductDescStaff from './ProductDescStaff'

const ProductDescAndControl = ({product,
                                item,
                                productId,
                                index}) => {
  const is_staff = useIsStaff()
  return(
    <Container>
      <Row>
        <p className='main-text'>{product.description}</p>
      </Row>
      {is_staff ?
        <ProductDescStaff productId={productId}
                          status={product.status}/>
      :
        <ProductDescClient product={product}
                           item={item}
                           index={index}/>}
    </Container>
  )
}

export default ProductDescAndControl;
