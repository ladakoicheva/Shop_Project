import { configureStore } from "@reduxjs/toolkit";
import basketReducer from './basket/basket'
import loadingReducer from './loading/loading'
import authReducer from './auth/auth'
import historyReducer from './history/history'
import favReducer from './fav/fav'

export const store = configureStore({
  reducer: {

    basket: basketReducer,
    auth: authReducer,
    loading: loadingReducer,
    history: historyReducer,
    fav:favReducer
    // name : 'NameReducer'
    //   test: {
    //     value: 0,
    //     name: 'Alex',
    //     id: 1313
    //   }
  },
});


// Тип всего состояния Redux
export type RootState = ReturnType<typeof store.getState>;

// Тип dispatch
export type AppDispatch = typeof store.dispatch;

// Тип самого store
export type AppStore = typeof store;