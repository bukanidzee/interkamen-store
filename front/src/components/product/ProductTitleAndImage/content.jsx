import {Link} from 'react-router-dom';

const Content = ({product, index}) => {
  return(
    <Link to={`/store/${ product.id }`}
          className='product-title-and-image'>
      <strong>{index+1}. {product.title}</strong>
      {product.image &&
        <img src={product.image}
             className = 'in-card-image'
             alt={`${ product.title }_image`}/>}
    </Link>
  )
}

export default Content
