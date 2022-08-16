import { createSelector } from 'reselect';

export const getFullnameOrFalse = () =>
  createSelector(
    (state) => state.auth,
    (auth) => {
      if (auth.fullname) {
        return auth.fullname.payload;
      } else {
        return false;
      }
    }
  )
