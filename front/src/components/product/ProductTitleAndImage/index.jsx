import MediaQuery from 'react-responsive'
import {useUserAgent} from '../../../hooks/useUserAgent';
import CompactVariant from './CompactVariant';
import BigVariant from './BigVariant';

const ProductTitleAndImage = ({product, index, isLarge, multipleItems}) => {
  const {productCardMedium, productCardMultiple} = useUserAgent()

  return(
    <>
      {multipleItems &&
        <MediaQuery minWidth={productCardMultiple} >
          <CompactVariant product={product}
                          isLarge={isLarge}
                          index={index}/>
        </MediaQuery>}
      <MediaQuery minWidth={productCardMedium}
                  {...(multipleItems ?
                    {maxWidth:productCardMultiple-1}
                   :
                    {})}>
        <BigVariant product={product}
                    isLarge={isLarge}
                    index={index}/>
      </MediaQuery>
      <MediaQuery maxWidth={productCardMedium-1}>
        <CompactVariant product={product}
                        isLarge={isLarge}
                        index={index}/>
      </MediaQuery>
    </>
  )
}

export default ProductTitleAndImage
