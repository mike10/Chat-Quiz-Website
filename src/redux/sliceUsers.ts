import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import type { RootState } from '../../app/store'
import { IInitForUsers } from '@/utils/constants'
import { RootState } from './store'

// Define the initial state using that type
const initialState:IInitForUsers = {
  user: '',
  users: [],
  
}

export const sliceUsers = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, PayloadAction) => {
      state.user = PayloadAction.payload;
    },
    addUser: (state, PayloadAction ) => {
      state.users.push(PayloadAction.payload);
    },
    removeUser: (state, PayloadAction ) => {
      const index = state.users.indexOf(PayloadAction.payload)
      state.users.splice(index, 1)
    },
  },
})

export const { setUser, addUser, removeUser } = sliceUsers.actions

export const getSelectorUser = (store:RootState) => store.users.user
export const getSelectorAllUser = (store:RootState) => store.users.users

export default sliceUsers.reducer