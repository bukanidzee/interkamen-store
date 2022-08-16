import {useMemo} from 'react'
import {readableNameAndInitials} from '../../utils/readable/readableNameAndInitials';

const OrderCardStaff = ({number, owner, date, total_prize}) => {

  const name = useMemo(() => {
    return readableNameAndInitials(owner)
  }, [])

  return (
    <strong>
      {number}. {name} Заказ от {date} на сумму {total_prize} руб.
    </strong>
  )
}

export default OrderCardStaff
