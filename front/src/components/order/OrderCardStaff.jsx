import {readableNameAndInitials} from '../../utils/readable/readableNameAndInitials';

const OrderCardStaff = ({number, owner, date, total_prize}) => {

  const name = readableNameAndInitials(owner)

  return (
    <strong>
      {number}. {name} {date} на сумму {total_prize} руб.
    </strong>
  )
}

export default OrderCardStaff
