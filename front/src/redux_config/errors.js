import { createSlice } from '@reduxjs/toolkit'

const errorsSlice = createSlice({
  name: 'errors',
  initialState: [],
  reducers: {
    appendError: (state, action) => {
      let err = action.payload
      state.push(err);
    },
    deleteError: (state, action) => {
      let index = action.payload
      state.splice(index, 1)
    },
  },
})

// Action creators are generated for each case reducer function
export const { appendError, deleteError } = errorsSlice.actions

export default errorsSlice.reducer;
