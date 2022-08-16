import {useState, useCallback} from 'react';

import {useFetchItem} from '../../hooks/useFetchItem';
import {useFirstLoadingCheck} from '../../hooks/useFirstLoadingCheck';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import CountAndPrize from '../UI/buttons/CountAndPrize';
import CloseButton from 'react-bootstrap/CloseButton'

const ProductItemClient = ({product,
                            item,
                            index,
                            place,
                            deleteChoosedProduct}) => {

  const [count, setCount] = useState(item?.quantity || 1)

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
      <Col sm={true}>
        <CountAndPrize count={count}
                       setCount={setCount}
                       productPrize={product.prize}
                       classes='count'/>
      </Col>
      <Col sm={'auto'}>
        {place==='store' &&
          <Button variant="outline-secondary"
                  onClick={async () => await fetchItem('addItem')}>
            Добавить в корзину
          </Button>}
        {place==='current' &&
          <CloseButton onClick={async () => await fetchItem('deleteItem')}/>}
      </Col>
    </>
  )
}

export default ProductItemClient
