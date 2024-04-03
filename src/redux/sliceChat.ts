import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import type { RootState } from '../../app/store'
import IInitForChat from '@/utils/constants' 


// Define the initial state using that type
const initialState: IInitForChat[] = []

export const sliceChat = createSlice({
  name: 'chat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getAllMessages: (state) => {
      
    },
    getMessagesToChat: (state, PayloadAction) => {
      state.push(PayloadAction.payload)
    },
    setMessageToChat: (state, PayloadAction) => {
      console.log(PayloadAction.payload);
    }
  },
})

export const { getAllMessages, getMessagesToChat, setMessageToChat } = sliceChat.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default sliceChat.reducer