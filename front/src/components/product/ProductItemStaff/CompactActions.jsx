import Col from 'react-bootstrap/Col';
import ProductDescStaff from '../ProductDescStaff';


const CompactActions = ({product, index, deleteChoosedProduct, status}) => {
  return (
    <Col sm className='d-flex flex-column justify-content-around align-items-center'>
      <div>
        Цена: {product.prize} руб.
      </div>
      <ProductDescStaff productId={product.id}
                        index={index}
                        deleteChoosedProduct={deleteChoosedProduct}
                        status={status}/>
    </Col>
  )
}

export default CompactActions
