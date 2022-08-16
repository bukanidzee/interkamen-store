import { useEffect, useState} from 'react';
import {useDeleteChoosedArrayElement} from '../../hooks/useDeleteChoosedArrayElement';
import {useAPI} from '../../hooks/useAPI';
import OrderService from '../../API/OrdersService';
import OrderBody from './OrderBody';
import LoadingThenContent from '../UI/loading/LoadingThenContent';

const OrderDetail = ({orderId,
                      index,
                      orders,
                      setOrders,
                      status,
                      setChoosedOrder,
                      isChoosedLoading,
                      setIsChoosedLoading,
                      changeHeightFunc,
                      choosed,
                      setChoosed}) => {
    const [orderDetails, setOrderDetails] = useState({});
    const deleteChoosedOrder = useDeleteChoosedArrayElement(orders,
                                                             setOrders,
                                                             choosed,
                                                             setChoosed)

    useEffect(() => {
      if (orderId >= 0) {
        getOrder(orderId);
        changeHeightFunc()
      }
    }, [orderId])

    const getOrder = useAPI(async () => {
      await OrderService.get_order(
        orderId,
        (response) => setOrderDetails(response))
    }, setIsChoosedLoading);

    const patchOrder = useAPI(async (data) => {
      await OrderService.partial_update(
        orderId,
        data,
        () => {
          deleteChoosedOrder(index)
        })
    }, setIsChoosedLoading)

    return(
      <LoadingThenContent isLoading={isChoosedLoading}>
          <OrderBody buttonAction={patchOrder}
                     status={status}
                     setChoosedOrder={setChoosedOrder}
                     orderDetails={orderDetails} />
      </LoadingThenContent>
    )
}

export default OrderDetail;

// import ActionButton from './UI/ActionButton';
// import ModalConfirmationPage from './UI/modal/ModalConfirmationPage';
// import ProductList from './ProductList';
// import Loader from './UI/loading/Loader';
// import { get_readable_date } from '../utils/readable_date';
// <div>
//   <ModalConfirmationPage action={patchOrder}
//                          visible={modal}
//                          setVisible={setModal}
//                          setChoosedOrder={setChoosedOrder}/>
//   {isLoading &&
//     <div style={{
//                 display:'flex',
//                 justifyContent:'center',
//                 marginTop: 50}}>
//       <Loader />
//     </div>
//   }
//   {orderDetails?.items?.length ?
//       <div>
//         <div style={{display:'flex', justifyContent:'space-between'}}>
//           <div>Заказ от {get_readable_date(new Date(orderDetails.created))}</div>
//           {orderDetails.finished &&
//             <div>
//               Завершён: {get_readable_date(new Date(orderDetails.finished))}
//             </div>}
//         </div>
//         <ProductList items={orderDetails.items} status='other'/>
//         {orderDetails.status === 'processing' &&
//           <ActionButton action={setModal}/>}
//       </div>
//     :
//       <h1 className='h1-center'>Извините заказ не найден</h1>
//   }
// </div>
