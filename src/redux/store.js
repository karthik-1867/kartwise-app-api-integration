import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice';
import createExpenseReducer from "../redux/createExpenseUser";
import expenseUserReducer from "../redux/createdExpenseGroup"
import allUserSlice from '../redux/allUsersSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({user:userReducer,createExpenseGroup:createExpenseReducer,expenseGroupInfo:expenseUserReducer,allUsers:allUserSlice});

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export const persistor = persistStore(store)
