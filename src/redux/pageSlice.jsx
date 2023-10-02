import { createSlice } from '@reduxjs/toolkit'
import VoiceManagement from '../VoiceManagment'

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    value: "voci",
  },
  reducers: {
    setPage: (state, action) => {
      state.value = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setPage } = pageSlice.actions

export default pageSlice.reducer