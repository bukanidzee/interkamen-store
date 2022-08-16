import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: true,
  },
  reducers: {
    setLoadingTrue: (state) => {
      state.isLoading = true;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoadingTrue, setLoadingFalse } = loadingSlice.actions

export default loadingSlice.reducer;
