import Col from 'react-bootstrap/Col';
import ProductDescStaff from '../ProductDescStaff';
import Price from '../../UI/universal/Price';


const BigActions = ({product, index, deleteChoosedProduct, status}) => {
  return (
    <>
      <Col sm={'auto'}>
        <Price price={product.prize}/>
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
