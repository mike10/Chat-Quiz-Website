import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import type { RootState } from '../../app/store'
import IInitForChat, { IQuiz } from '@/utils/constants' 
import { useSelector } from 'react-redux'
import { RootState } from './store'


// Define the initial state using that type
const initialState: IQuiz = {
  name: '',
  time: 0,
  user: ''
}

export const sliceQuiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    getAskQuiz:(state, PayloadAction) => {
      return PayloadAction.payload
    },
  },
})

export const getUseSelectorQuiz = (store:RootState) => store.quiz.quiz
export const getQuizResult = (store:RootState) => store.quiz.quizResult 

export const { getAskQuiz } = sliceQuiz.actions

export default sliceQuiz.reducer