import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import CounterReducer from './reducers/CounterReducer';
import FetchDataReducer from './reducers/FetchDataReducer';
import CrudSampleReducer from './reducers/CrudSampleReducer';
import CrudSample2Reducer from './reducers/CrudSample2Reducer';

export default function createStore() {

    const store = reduxCreateStore(
        combineReducers({
            CounterReducer,
            FetchDataReducer,
            CrudSampleReducer,
            CrudSample2Reducer
        }),
        applyMiddleware(/*logger,*/ thunk)
    );
    
  return store;
}