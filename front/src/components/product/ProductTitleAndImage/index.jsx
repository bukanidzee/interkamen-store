import Col from 'react-bootstrap/Col';
import Content from './content';

const ProductTitleAndImage = ({product, isLarge, index, isGrid}) => {
  return(
    <>
      {!isGrid ?
        <Col sm={isLarge ? 5 : 4}
             key={`${product.id}`}
             className='d-flex flex-column'>
          <Content index={index} product={product} />
        </Col> :
        <div key={`${product.id}`}
             className='d-flex flex-column'>
          <Content index={index} product={product} />
        </div>}
    </>
  )
}

export default ProductTitleAndImage
