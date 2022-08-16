import {configureStore} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './user';
import loadingReducer from './loading';
import currentOrderReducer from './current_order';
import errorsReducer from './errors'



export const appStore = configureStore({
  reducer: {
    auth: userReducer,
    loading: loadingReducer,
    currentOrder: currentOrderReducer,
    errors: errorsReducer
  },
}, composeWithDevTools())
