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
  user: '',
  isPlay: false,
  isReadyQuizResult: false,
  quizResult: [],
  questions:[],
}

export const sliceQuiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    getAskQuiz:(state, PayloadAction) => {
      console.log('getAskQuiz', PayloadAction);
      return {...state, ...PayloadAction.payload, isPlay:true}
    },
    setPlayToQuiz:(state, PayloadAction) => {
      state.isPlay = PayloadAction.payload;
    },
    setReadyQuizResult:(state, PayloadAction) => {
      state.isReadyQuizResult=PayloadAction.payload;
    },
    setQuizResult:(state, PayloadAction) => {
      console.log(PayloadAction.payload);
      state.quizResult.push(PayloadAction.payload);
    },
  },
})

export const getSelectorQuizName = (store:RootState) => store.quiz.name
export const getSelectorQuizIsPlay = (store:RootState) => store.quiz.isPlay 
export const getSelectorIsReadyQuizResult  = (store:RootState) => store.quiz.isReadyQuizResult
export const getSelectorQuizResult = (store:RootState) => store.quiz.quizResult
export const getSelectorQuizQuestions = (store:RootState) => store.quiz.questions

export const { getAskQuiz, setPlayToQuiz, setQuizResult, setReadyQuizResult } = sliceQuiz.actions

export default sliceQuiz.reducer