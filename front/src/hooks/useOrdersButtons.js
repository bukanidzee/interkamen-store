import {ordersButtons} from '../utils/buttons/ordersButtons';
import {orderButtonsCases} from '../utils/buttons/orderButtonsCases';
import {useSelector} from 'react-redux';

const getCaseButtons = (status, is_staff) => {
  return orderButtonsCases[status][is_staff]
}

export const useOrdersButtons = (status, setModal, setActionData) => {
  const is_staff = useSelector(state => state.auth.is_staff)

  const buttonsCase = getCaseButtons(status, is_staff)

  const buttons = buttonsCase.map(button => {
      return {name:ordersButtons[button].name,
              action:() => {
                setActionData(ordersButtons[button].data)
                setModal(true)
              }}
    })

  return buttons
}
