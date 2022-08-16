import { createSlice } from '@reduxjs/toolkit'

const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState:{
    id: null,
    items: [],
    total_prize: 0,
    status: ''
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      state.items = [...state.items, item];
      state.total_prize = state.total_prize + Number(item.prize);
    },
    deleteItem: (state, action) => {
      const {prize, index} = action.payload;
      state.items.splice(index, 1);
      state.total_prize = state.total_prize - prize;
    },
    changeItem: (state, action) => {
      const {index, count} = action.payload;
      const dif = (count - state.items[index].quantity) * state.items[index].product.prize
      state.items[index].quantity = count
      state.total_prize = state.total_prize + dif;
    },
    setOrder: (state, action) => {
      const {id, items, total_prize} = action.payload;
      state.id = id;
      state.items = items;
      state.total_prize = total_prize;
      state.status = 'current';
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItem, deleteItem, changeItem, setOrder } = currentOrderSlice.actions

export default currentOrderSlice.reducer;
