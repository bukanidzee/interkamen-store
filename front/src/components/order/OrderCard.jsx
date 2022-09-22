import '../../static/css/components/ordercard.css';
import { useMemo} from 'react';
import {useIsStaff} from '../../hooks/useAuthData';
import { get_readable_date } from '../../utils/readable/readable_date';
import OrderCardStaff from './OrderCardStaff'
import classnames from 'classnames'

const OrderCard = ({order, number, setChoosedOrder, activeClassName}) => {
  // const classNames = useMemo(() => {
  //   let names = ['order-card'];
  //   if (activeClassName) {
  //     names.push('order-card-active')
  //   }
  //   return names
  // }, [activeClassName])

  const is_staff = useIsStaff()

  const date = useMemo(() => {
    return get_readable_date(new Date(order.created))
  }, [])

  return(
    <div onClick={()=> setChoosedOrder(order.id)}
         className={classnames('order-card',
                               {'order-card-active':activeClassName})}>
      {is_staff ?
        <OrderCardStaff number={number} owner={order.owner} date={date} total_prize={order.total_prize}/>
      :
        <strong>
          {number}. Заказ от {date} на сумму {order.total_prize} руб.
        </strong>}

    </div>
  )
}

export default OrderCard;
