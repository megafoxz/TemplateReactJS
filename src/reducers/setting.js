
import { SETTING } from '../constants/setting'
let initialState = {}
const data = window.localStorage.getItem('setting')
if(data && data.length){
 const newData = JSON.parse(data)
 initialState={
   ...initialState,
   ...newData
 }
}

export default function settingReducer(state = initialState, action) {
  switch (action.type) {
    case SETTING: {
      window.localStorage.setItem('setting', JSON.stringify({
        ...state,
        ...action.data,
      }))
      return {
        ...state,
        ...action.data,
      }
    }
    default:
      return state
  }
}

