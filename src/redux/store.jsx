import { configureStore } from '@reduxjs/toolkit'
import pageReducer from "./pageSlice"
import userReducer from "./userSlice"
import tokenReducer from "./tokenSlice"

export default configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    token: tokenReducer
  },
})