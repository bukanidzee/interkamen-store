import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import {getIsStaff,
        getIsStaffAndFullName} from '../redux_config/selectors/getAuthData';

export const useIsStaff = () => {
  const selectIsStaff = useMemo(getIsStaff, [])

  const is_staff = useSelector(
    state => selectIsStaff(state))

  return is_staff
}

export const useIsStaffAndFullname = () => {
  const selectIsStaffAndFullname = useMemo(getIsStaffAndFullName, [])

  const [is_staff, fullname] = useSelector(
    state => selectIsStaffAndFullname(state))

  return [is_staff, fullname]
}
