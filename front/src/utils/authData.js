import axios from 'axios';
import OrderService from '../API/OrdersService';
import {readableNameAndInitials} from './readable/readableNameAndInitials';

export const addAuthData = (data, login) => {
  axios.defaults.headers.common['Authorization'] = 'Token '+ data.key;
  const fullname = readableNameAndInitials(data)
  localStorage.setItem('fullname', fullname);
  localStorage.setItem('authKey', 'Token ' + data.key);
  localStorage.setItem('is_staff', data.is_staff)
  localStorage.setItem('userId', data.user_id)
  login({fullname: fullname,
         is_staff: String(data.is_staff),
         userId: data.user_id});
}

export const deleteAuthData = (setOrder, logout) => {
  delete axios.defaults.headers.common['Authorization']
  logout();
  localStorage.removeItem('fullname');
  localStorage.removeItem('authKey');
  localStorage.removeItem('is_staff');
  localStorage.removeItem('userId')
  setOrder({id: null,
            items: [],
            total_prize: 0,
            status:''})
}

export const getCurrentOrder = async (is_staff,
                                      setOrder) => {
  if (!is_staff) {
    await OrderService.get_current_order(
       (response) => {
         setOrder(response)
       })
  }
}
// if (newLocation) {
//   navigate(newLocation);
// }
