import {createStore , combineReducers} from 'redux';
import { LoginCheck } from './Reducers';



const rootReducers =  combineReducers({
    data : LoginCheck
})

const store  = createStore(rootReducers)

export default store;