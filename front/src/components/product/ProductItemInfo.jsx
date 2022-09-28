import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductTitleAndImage from './ProductTitleAndImage';

const ProductItemInfo = ({item, index}) => {

  return(
    <Container className='product_item_card'>
      <Row>
        <ProductTitleAndImage product={item.product}
                              index={index}
                              isLarge={false}/>
        <Col xs='auto'>
          Количество: {item.quantity}
        </Col>
        <Col className='d-flex justify-content-end'>
          Общая цена: {item.prize} руб.
        </Col>
      </Row>
    </Container>
  )
}

export default ProductItemInfo;
