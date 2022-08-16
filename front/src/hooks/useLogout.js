import {useAction} from './useAction';
import UserService from '../API/UserService';
import {deleteAuthData} from '../utils/authData';
import {useAPI} from './useAPI';

export const useLogout = () => {
  const {setOrder, logout} = useAction()

  const logoutClick = useAPI(async () => {
    await UserService.logout(() => {
      deleteAuthData(setOrder, logout)
    });
  })

  return logoutClick
}
