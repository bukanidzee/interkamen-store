import {useState} from 'react';
import {useFetchItem} from '../../../hooks/useFetchItem';
import {useFirstLoadingCheck} from '../../../hooks/useFirstLoadingCheck';
import CloseButton from 'react-bootstrap/CloseButton'
import BigCount from './BigCount';
import CompactCount from './CompactCount';
import '../../../static/css/UI/count.scss';
import '../../../static/css/UI/closeButton.scss';

const ProductItemClient = ({product,
                            item,
                            index,
                            place,
                            deleteChoosedProduct,
                            isGrid}) => {

  const [count, setCount] = useState(item?.quantity || 1)

  const fetchCallback = (action) => {
    if (action === 'addItem') {
      deleteChoosedProduct(index)
    }
  }

  const fetchItem = useFetchItem(product,
                                 count,
                                 item,
                                 index,
                                 fetchCallback)

  const callback = async () => {
    if (place === 'current') {
      await fetchItem('changeItem');
    }
  }

  useFirstLoadingCheck(callback, [count])



  return(
    <>
      {isGrid ?
          <CompactCount count={count}
                        setCount={setCount}
                        productPrize={product.prize}
                        place={place}
                        fetchItem={fetchItem}/>
       :
          <BigCount count={count}
                    setCount={setCount}
                    productPrize={product.prize}
                    place={place}
                    fetchItem={fetchItem}/>
      }
      {place==='current' &&
        <CloseButton  className='closeButton'
                      onClick={async () => await fetchItem('deleteItem')}/>}
    </>
  )
}

export default ProductItemClient
