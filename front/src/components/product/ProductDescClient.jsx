import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useMemo, useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useFetchItem} from '../../hooks/useFetchItem'
import {useFirstLoadingCheck} from '../../hooks/useFirstLoadingCheck'
import CountAndPrize from '../UI/buttons/CountAndPrize';
import OneButtonOrGroup from '../UI/buttons/OneButtonOrGroup';

const ProductDescClient = ({product,
                                   item,
                                   index}) => {

  const [count, setCount] = useState(item?.quantity || 1);
  const navigate = useNavigate();

  const fetchCallback = useCallback((action) => {
    if (action === 'addItem') {
      navigate('/store')
    } else if (action === 'deleteItem') {
      navigate('/orders')
    }
  })

  const fetchItem = useFetchItem(product,
                                 count,
                                 item,
                                 index,
                                 fetchCallback)

  const callback = useCallback(async () => {
    if (item) {
      await fetchItem('changeItem');
    }
  }, [item, count])

  useFirstLoadingCheck(callback, [count])

  const buttons = useMemo(() => {
    return item ?
      [{action: async () => await fetchItem('deleteItem'),
        name: 'Удалить продукт'}]
    :
      [{action: async () => await fetchItem('addItem'),
        name: 'Добавить продукт'}]
  }, [item])

  return(
    <Row>
      <Col sm>
        <CountAndPrize count={count}
                       setCount={setCount}
                       productPrize={product.prize}
                       classes='count spaceBetween'/>
      </Col>
      <Col sm className='d-flex justify-content-end'>
        <OneButtonOrGroup buttons={buttons}/>
      </Col>
    </Row>
  )
}

export default ProductDescClient
