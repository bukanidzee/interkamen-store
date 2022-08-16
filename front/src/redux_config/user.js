import { createSlice } from '@reduxjs/toolkit'
import {changeReadableFullname} from '../utils/readable/changeReadableFullname'


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    fullname: null,
    userId: null,
    is_staff: false
  },
  reducers: {
    login: (state, action) => {
      const {fullname, is_staff, userId} = action.payload
      state.fullname = fullname;
      if (is_staff === 'true') {
        state.is_staff = true;
      } else {
        state.is_staff = false;
      }
      state.userId = userId
    },
    logout: (state) => {
      state.fullname = null;
      state.is_staff = false;
      state.userId = null;
    },
    setFullname: (state, action) => {
      const {fullname} = action.payload
      state.fullname = fullname;
    },
    changeFullname: (state, action) => {
      const {field} = action.payload
      state.fullname = changeReadableFullname(state.fullname, field);
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, setFullname, changeFullname} = authSlice.actions

export default authSlice.reducer;
