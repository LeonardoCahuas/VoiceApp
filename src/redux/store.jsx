import { configureStore } from '@reduxjs/toolkit'
import pageReducer from "./pageSlice"
import userReducer from "./userSlice"
import tokenReducer from "./tokenSlice"
import indexReducer from "./indexSlice"

export default configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    token: tokenReducer,
    index: indexReducer
  },
})