import '../../static/css/components/ordercard.scss';
import { useMemo} from 'react';
import {useIsStaff} from '../../hooks/useAuthData';
import { get_readable_date } from '../../utils/readable/readable_date';
import OrderCardStaff from './OrderCardStaff'
import classnames from 'classnames'

const OrderCard = ({order, number, setChoosedOrder, choosedOrder}) => {

  const is_staff = useIsStaff()

  const date = useMemo(() => {
    return get_readable_date(new Date(order.created))
  }, [])

  const isActive = choosedOrder === order.id

  const onClickCallback = () => {
    if (isActive) {
      setChoosedOrder(-1)
    } else {
      setChoosedOrder(order.id)
    }
  }

  return(
    <div onClick={onClickCallback}
         className={classnames('order-card',
                               {'order-card-active':isActive})}>
      {is_staff ?
        <OrderCardStaff number={number}
                        owner={order.owner}
                        date={date}
                        total_prize={order.total_prize}/>
      :
        <strong>
          {number}. Заказ от {date} на сумму {order.total_prize} руб.
        </strong>}

    </div>
  )
}

export default OrderCard;
