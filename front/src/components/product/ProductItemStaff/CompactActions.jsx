import ProductDescStaff from '../ProductDescStaff';
import Price from '../../UI/universal/Price';


const CompactActions = ({product, index, deleteChoosedProduct, status}) => {
  return (
    <>
      <Price price={product.prize}/>
      <ProductDescStaff productId={product.id}
                        index={index}
                        deleteChoosedProduct={deleteChoosedProduct}
                        status={status}/>
    </>
  )
}

export default CompactActions
