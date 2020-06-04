import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import CounterReducer from './reducers/CounterReducer';
import FetchDataReducer from './reducers/FetchDataReducer';
import CrudSampleReducer from './reducers/CrudSampleReducer';

export default function createStore() {

    const store = reduxCreateStore(
        combineReducers({
            CounterReducer,
            FetchDataReducer,
            CrudSampleReducer
        }),
        applyMiddleware(/*logger,*/ thunk)
    );
    
  return store;
}