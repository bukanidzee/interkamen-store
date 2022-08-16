import { createSelector } from 'reselect';

export const getIsStaff = () => createSelector(
  (state) => state.auth,
  (auth) => auth.is_staff
)

export const getIsStaffAndFullName = () => createSelector(
  (state) => state.auth,
  (auth) => [auth.is_staff, auth.fullname]
)
