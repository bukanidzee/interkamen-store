import {useState, useCallback} from 'react';
import {useFetchItem} from '../../../hooks/useFetchItem';
import {useFirstLoadingCheck} from '../../../hooks/useFirstLoadingCheck';
import {useUserAgent} from '../../../hooks/useUserAgent';
import CloseButton from 'react-bootstrap/CloseButton'
import MediaQuery from 'react-responsive'
import BigCount from './BigCount';
import CompactCount from './CompactCount';
import '../../../static/css/UI/count.scss';

const ProductItemClient = ({product,
                            item,
                            index,
                            place,
                            deleteChoosedProduct,
                            multipleItems}) => {

  const [count, setCount] = useState(item?.quantity || 1)
  const {productCardBig, productCardMultiple} = useUserAgent()

  const fetchCallback = useCallback((action) => {
    if (action === 'addItem') {
      deleteChoosedProduct(index)
    }
  })

  const fetchItem = useFetchItem(product,
                                 count,
                                 item,
                                 index,
                                 fetchCallback)

  const callback = useCallback(async () => {
    if (place === 'current') {
      await fetchItem('changeItem');
    }
  }, [place, count])

  useFirstLoadingCheck(callback, [count])



  return(
    <>
      {multipleItems &&
        <MediaQuery minWidth={productCardMultiple}>
          <CompactCount count={count}
                        setCount={setCount}
                        productPrize={product.prize}
                        place={place}
                        fetchItem={fetchItem}/>
        </MediaQuery>}
      <MediaQuery minWidth={productCardBig}
                  {...(multipleItems ?
                    {maxWidth:productCardMultiple-1}
                   :
                    {})}>
        <BigCount count={count}
                      setCount={setCount}
                      productPrize={product.prize}
                      place={place}
                      fetchItem={fetchItem}/>
      </MediaQuery>
      <MediaQuery maxWidth={productCardBig-1}>
        <CompactCount count={count}
                        setCount={setCount}
                        productPrize={product.prize}
                        place={place}
                        fetchItem={fetchItem}/>
      </MediaQuery>
      {place==='current' &&
        <CloseButton  style={{position:'absolute',
                              top:5,
                              right:5}}
                      onClick={async () => await fetchItem('deleteItem')}/>}
    </>
  )
}

export default ProductItemClient
