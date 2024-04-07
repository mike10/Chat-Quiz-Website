//'use client'
import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import sliceChat from './sliceChat'
import sliceUsers from './sliceUsers';
import sliceQuiz from './sliceQuiz';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        chat: sliceChat,
        users: sliceUsers,
        quiz: sliceQuiz,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
  })

  sagaMiddleware.run(rootSaga)
  
  // Infer the type of makeStore
  export type RootState = ReturnType<typeof store.getState>
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type AppDispatch = typeof store.dispatch
