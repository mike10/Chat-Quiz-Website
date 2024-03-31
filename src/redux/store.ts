'use client'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {},
  })
  
  // Infer the type of makeStore
  export type RootState = ReturnType<typeof store.getState>
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type AppDispatch = typeof store.dispatch
