import { createSlice } from '@reduxjs/toolkit'
import IInitForChat from '@/utils/constants' 
import { RootState } from './store';


// Define the initial state using that type
const initialState: IInitForChat[] = []

export const sliceChat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getMessagesToChat: (state, PayloadAction) => {
      state.push(PayloadAction.payload);
    },
  },
})

export const { getMessagesToChat } = sliceChat.actions

export const getChat = (store:RootState) => store.chat

export default sliceChat.reducer