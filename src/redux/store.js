import authReducer from '@/redux/slices/auth'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const combinedReducer = combineReducers({
  auth: authReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    state = undefined
  }
  return combinedReducer(state, action)
}

export default configureStore({
  reducer: rootReducer
})
