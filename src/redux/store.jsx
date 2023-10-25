import { configureStore } from '@reduxjs/toolkit'
import pageReducer from "./pageSlice"
import userReducer from "./userSlice"

export default configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer
  },
})