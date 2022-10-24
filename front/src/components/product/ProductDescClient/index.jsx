import Row from 'react-bootstrap/Row';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../../static/css/UI/count.scss';

import {useFetchItem} from '../../../hooks/useFetchItem';
import {useFirstLoadingCheck} from '../../../hooks/useFirstLoadingCheck';
import BigCount from './BigCount';
import CompactCount from './CompactCount'
import MediaQuery from 'react-responsive';
import {useUserAgent} from '../../../hooks/useUserAgent';

const ProductDescClient = ({product,
                            item,
                            index}) => {

  const [count, setCount] = useState(item?.quantity || 1);
  const navigate = useNavigate();

  const {productDetailWide} = useUserAgent()

  const fetchCallbackActions = {
    'addItem': () => navigate('/store'),
    'deleteItem': () => navigate('/orders')
  }

  const fetchCallback = (action) => {
    fetchCallbackActions[action]()
  }

  const fetchItem = useFetchItem(product,
                                 count,
                                 item,
                                 index,
                                 fetchCallback)

  const callback = async () => {
    if (item) {
      await fetchItem('changeItem');
    }
  }

  useFirstLoadingCheck(callback, [count])

  const buttons = item ?
      [{action: async () => await fetchItem('deleteItem'),
        name: 'Удалить продукт'}]
    :
      [{action: async () => await fetchItem('addItem'),
        name: 'Добавить продукт'}]

  return(
    <Row>
      <MediaQuery minWidth={productDetailWide}>
        <BigCount count={count}
                  setCount={setCount}
                  productPrize={product.prize}
                  buttons={buttons}/>
      </MediaQuery>
      <MediaQuery maxWidth={productDetailWide-1}>
        <CompactCount count={count}
                      setCount={setCount}
                      productPrize={product.prize}
                      buttons={buttons}/>
      </MediaQuery>
    </Row>
  )
}

export default ProductDescClient
