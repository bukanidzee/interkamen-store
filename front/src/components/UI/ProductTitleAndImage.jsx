import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const ProductTitleAndImage = ({product, index}) =>
  <>
    <Col xl={3} sm={2} key={`${product.id}_title`}>
      <Link to={`/store/${ product.id }`}>
        <strong>{index+1}. {product.title}</strong>
      </Link>
    </Col>
    {product.image &&
      <Col xl={3} sm={4} key={`${product.id}_image`}>
        <img src={product.image}
             className = 'in-card-image'
             alt={`${ product.title }_image`}/>
      </Col>}
  </>


export default ProductTitleAndImage

// const cols_list = [
//     <Col sm={'auto'} key={`${product.id}_title`}>
//       <Link to={`/store/${ product.id }`}>
//         <strong>{index+1}. {product.title}</strong>
//       </Link>
//
//     </Col>]
// if (product.image) {
//   cols_list.push(
//     <Col sm={'auto'} key={`${product.id}_image`}>
//       <img src={product.image}
//            className = 'in-card-image'
//            alt={`${ product.title }_image`}/>
//     </Col>
//   )
// }
// return cols_list;
// }
