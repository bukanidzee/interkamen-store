import '../../static/css/components/ordercard.scss';
import {useSelector} from 'react-redux';
import { get_readable_date } from '../../utils/readable/readable_date';
import OrderCardStaff from './OrderCardStaff'
import classnames from 'classnames'

const OrderCard = ({order, number, setChoosedOrder, choosedOrder}) => {

  const is_staff = useSelector(state => state.auth.is_staff)

  const date = get_readable_date(new Date(order.created))

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
                               {'order-card-active':isActive},
                               {'order-card-short':choosedOrder!==-1})}>
      {is_staff ?
        <OrderCardStaff number={number}
                        owner={order.owner}
                        date={date}
                        total_prize={order.total_prize}/>
      :
        <strong>
          {number}. {date} на сумму {order.total_prize} руб.
        </strong>}

    </div>
  )
}

export default OrderCard;
