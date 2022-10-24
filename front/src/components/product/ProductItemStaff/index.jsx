import BigActions from './BigActions';
import CompactActions from './CompactActions';


const ProductItemStaff = ({product,
                           index,
                           deleteChoosedProduct,
                           status,
                           isGrid}) => {

  return(
    <>
      {isGrid ?
        <CompactActions product={product}
                        index={index}
                        deleteChoosedProduct={deleteChoosedProduct}
                        status={status}/>
       :
        <BigActions product={product}
                    index={index}
                    deleteChoosedProduct={deleteChoosedProduct}
                    status={status}/>
      }
    </>
  )
}

export default ProductItemStaff;
