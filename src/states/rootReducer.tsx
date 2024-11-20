import { combineReducers } from 'redux'
import userReducer from './reducer/userSlice'

const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer;