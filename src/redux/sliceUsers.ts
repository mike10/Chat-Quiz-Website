import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import type { RootState } from '../../app/store'
import { IInitForUsers } from '@/utils/constants'
import { RootState } from './store'

// Define the initial state using that type
const initialState:IInitForUsers = {
  user: '',
  users: []
}

export const sliceUsers = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, PayloadAction) => {
      state.user = PayloadAction.payload;
    },
    getAllUsers: (state, PayloadAction ) => {
      state.users = PayloadAction.payload;
    },
  },
})

export const { setUser, getAllUsers } = sliceUsers.actions

export const getUser = (store:RootState) => store.users.user

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default sliceUsers.reducer