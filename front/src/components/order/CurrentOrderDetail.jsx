import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import OrderBody from './OrderBody';
import {useAPI} from '../../hooks/useAPI';
import {useAction} from '../../hooks/useAction';
import OrderService from '../../API/OrdersService';

const CurrentOrderDetail = () => {
  const {setOrder} = useAction()
  const navigate = useNavigate()
  const [orderDetails, setOrderDetails] = useState({});
  const [isRerenderAllowed, setIsRerenderAllowed] = useState(true)

  const currentOrder = useSelector(state => state.currentOrder)

  useEffect(() => {
    if (isRerenderAllowed) {
      setOrderDetails(currentOrder)
    }
  }, [currentOrder])

  const patchOrder = useAPI(async (data) => {
    await OrderService.partial_update(
      currentOrder.id,
      data,
      async () => {
        await OrderService.get_current_order(
          (response) => {
            setIsRerenderAllowed(false)
            setOrder(response)
            navigate('/store')
          }
        )
      }
    )
  })

  return(
    <OrderBody buttonAction={patchOrder}
               status='current'
               orderDetails={orderDetails}/>
  )
}

export default CurrentOrderDetail;
