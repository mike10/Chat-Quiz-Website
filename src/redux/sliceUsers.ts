import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import type { RootState } from '../../app/store'
import { IInitForUsers } from '@/utils/constants'

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
    getAllUsers: (state) => {
      
    },
    addNewUser: () => {

    }
  },
})

export const { setUser, getAllUsers, addNewUser } = sliceUsers.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default sliceUsers.reducer