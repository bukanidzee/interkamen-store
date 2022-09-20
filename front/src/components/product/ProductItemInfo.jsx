import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductTitleAndImage from '../UI/ProductTitleAndImage';

const ProductItemInfo = ({item, index}) => {

  return(
    <Container className='product_item_card'>
      <Row>
        <ProductTitleAndImage product={item.product} index={index}/>
        <Col style={{justifyContent:'center'}}>
          Количество: {item.quantity}
        </Col>
        <Col style={{justifyContent:'center'}}>
          Общая цена: {item.prize} руб.
        </Col>
      </Row>
    </Container>
  )
}

export default ProductItemInfo;
