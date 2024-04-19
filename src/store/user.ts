import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserState {
  id: number
  name: string
  logged: boolean
}

// Define the initial state using that type
const initialState: UserState = {
  id: 0,
  name: '',
  logged: false
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.logged = true
    },
    logout: (state) => {
      Object.assign(state, initialState)
    }
  }
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export default userSlice.reducer