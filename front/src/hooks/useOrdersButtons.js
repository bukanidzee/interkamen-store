import {ordersButtons} from '../utils/buttons/ordersButtons';
import {orderButtonsCases} from '../utils/buttons/orderButtonsCases';
import {useIsStaff} from './useAuthData';
import {useMemo} from 'react'

const getCaseButtons = (status, is_staff) => {
  return orderButtonsCases[status][is_staff]
}

export const useOrdersButtons = (status, setModal, setActionData) => {
  const is_staff = useIsStaff()

  const buttonsCase = useMemo(() => {
    return getCaseButtons(status, is_staff)
  }, [is_staff, status])

  const buttons = useMemo(() => {
    return buttonsCase.map(button => {
      return {name:ordersButtons[button].name,
              action:() => {
                setActionData(ordersButtons[button].data)
                setModal(true)
              }}
    })
  }, [buttonsCase])

  return buttons
}
