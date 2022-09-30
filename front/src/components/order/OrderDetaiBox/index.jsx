import ColBox from './ColBox'
import OffcanvasBox from './OffcanvasBox';
import {useUserAgent} from '../../../hooks/useUserAgent';
import MediaQuery from 'react-responsive';
import '../../../static/css/components/orderbox.scss';

const OrderDetailBox = ({orderId,
                         index,
                         orders,
                         setOrders,
                         status,
                         setChoosedOrder,
                         isChoosedLoading,
                         setIsChoosedLoading,
                         choosed,
                         setChoosed}) => {
  const {ordersWide} = useUserAgent()
  return(
    <>
      <MediaQuery minWidth={ordersWide}>
        <ColBox orderId={orderId}
                index={index}
                orders={orders}
                setOrders={setOrders}
                status={status}
                setChoosedOrder={setChoosedOrder}
                isChoosedLoading={isChoosedLoading}
                setIsChoosedLoading={setIsChoosedLoading}
                choosed={choosed}
                setChoosed={setChoosed}/>
      </MediaQuery>
      <MediaQuery maxWidth={ordersWide-1}>
        <OffcanvasBox orderId={orderId}
                      index={index}
                      orders={orders}
                      setOrders={setOrders}
                      status={status}
                      setChoosedOrder={setChoosedOrder}
                      isChoosedLoading={isChoosedLoading}
                      setIsChoosedLoading={setIsChoosedLoading}
                      choosed={choosed}
                      setChoosed={setChoosed}/>
      </MediaQuery>
    </>
  )
}

export default OrderDetailBox
