import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./test/test";
import sliceReducer from './test2/test2'
import basketReducer from './basket/basket'
import loadingReducer from './loading/loading'
import authReducer from './auth/auth'


export const store = configureStore({
  reducer: {
    test: testReducer,
    test2: sliceReducer,
    basket: basketReducer,
    auth: authReducer,
    loading: loadingReducer,
    // name : 'NameReducer'
    //   test: {
    //     value: 0,
    //     name: 'Alex',
    //     id: 1313
    //   }
  },
});