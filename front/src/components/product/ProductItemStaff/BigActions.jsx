import Col from 'react-bootstrap/Col';
import ProductDescStaff from '../ProductDescStaff';


const BigActions = ({product, index, deleteChoosedProduct, status}) => {
  return (
    <>
      <Col sm={'auto'}>
        Цена: {product.prize} руб.
      </Col>
      <Col sm>
        <ProductDescStaff productId={product.id}
                          index={index}
                          deleteChoosedProduct={deleteChoosedProduct}
                          status={status}/>
      </Col>
    </>
  )
}

export default BigActions
