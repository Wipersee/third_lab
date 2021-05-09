import {combineReducers} from 'redux';
import {userReducer} from './userReducer'
import {loginReducer} from './loginReducer'


const rootReducer = combineReducers({
    userReducer: userReducer,
    loginReducer: loginReducer
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>