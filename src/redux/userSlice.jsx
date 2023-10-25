import { createSlice } from '@reduxjs/toolkit'
import VoiceManagement from '../VoiceManagment'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: "0",
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer