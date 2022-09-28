import MediaQuery from 'react-responsive';
import {useUserAgent} from '../../../hooks/useUserAgent';
import BigActions from './BigActions';
import CompactActions from './CompactActions';


const ProductItemStaff = ({product,
                           index,
                           deleteChoosedProduct,
                           status,
                           multipleItems}) => {
  const {sidebarVisible, productCardMultiple} = useUserAgent()
  return(
    <>
      {multipleItems &&
        <MediaQuery minWidth={productCardMultiple}>
          <CompactActions product={product}
                          index={index}
                          deleteChoosedProduct={deleteChoosedProduct}
                          status={status}/>
        </MediaQuery>}
      <MediaQuery minWidth={sidebarVisible}
                  {...(multipleItems ?
                    {maxWidth:productCardMultiple-1}
                   :
                    {})}>
        <BigActions product={product}
                    index={index}
                    deleteChoosedProduct={deleteChoosedProduct}
                    status={status}/>
      </MediaQuery>
      <MediaQuery maxWidth={sidebarVisible-1}>
        <CompactActions product={product}
                        index={index}
                        deleteChoosedProduct={deleteChoosedProduct}
                        status={status}/>
      </MediaQuery>
    </>
  )
}

export default ProductItemStaff;
