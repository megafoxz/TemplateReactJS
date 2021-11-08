import { combineReducers } from 'redux'
import app from './app'
import member from './member'
import setting from './setting'

const rootReducer = combineReducers({
  member,
  app,
  setting
})

export default rootReducer