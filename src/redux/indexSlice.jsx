import { createSlice } from '@reduxjs/toolkit'

export const indexSlice = createSlice({
  name: 'index',
  initialState: {
    value: "",
  },
  reducers: {
    setIndex: (state, action) => {
      state.value = action.payload
    },
    
  },
})

export const { setIndex } = indexSlice.actions

export default indexSlice.reducer