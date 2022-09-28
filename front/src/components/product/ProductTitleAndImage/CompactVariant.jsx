import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const CompactVariant = ({product, isLarge, index}) => {
  return(
    <Col sm={isLarge ? 6 : 4}
         key={`${product.id}`}
         className='d-flex flex-column'>
      <Link to={`/store/${ product.id }`}>
        <strong>{index+1}. {product.title}</strong>
      </Link>
      {product.image &&
        <img src={product.image}
             className = 'in-card-image'
             alt={`${ product.title }_image`}/>}
    </Col>
  )
}

export default CompactVariant
