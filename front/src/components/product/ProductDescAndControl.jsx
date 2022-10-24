import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {useSelector} from 'react-redux';
import ProductDescClient from './ProductDescClient'
import ProductDescStaff from './ProductDescStaff'

const ProductDescAndControl = ({product,
                                item,
                                productId,
                                index}) => {
  const is_staff = useSelector(state => state.auth.is_staff)
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
