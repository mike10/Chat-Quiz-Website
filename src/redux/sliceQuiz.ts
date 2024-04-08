import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import type { RootState } from '../../app/store'
import IInitForChat from '@/utils/constants' 


// Define the initial state using that type
const initialState: boolean = false

export const sliceQuiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setAskQuiz: (state) => {
      return state;
    },
    getAskQuiz:(state, PayloadAction) => {
      //console.log('getAskQuiz',PayloadAction.payload);
      console.log(state);
      return true
    },
    sendAnswerCancel: () => {
      return false
    },
   
  },
})

export const { setAskQuiz, sendAnswerCancel, getAskQuiz } = sliceQuiz.actions

export default sliceQuiz.reducer