import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const BigVariant = ({product, isLarge, index}) => {
  return(
    <>
      <Col xs='auto' key={`${product.id}_title`}>
        <Link to={`/store/${ product.id }`}>
          <strong>{index+1}. {product.title}</strong>
        </Link>
      </Col>
      {product.image &&
        <Col xs={isLarge ? 4 : 3} key={`${product.id}_image`}>
          <img src={product.image}
               className = 'in-card-image'
               alt={`${ product.title }_image`}/>
        </Col>}
    </>
  )
}

export default BigVariant
