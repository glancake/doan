import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'
// 定义state类型
export interface UserState {
  accessToken: string
}

// 定义state初始值
const initialState: UserState = {
  accessToken: ''
}

// 创建slice
export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    }
  },
})

// 导出action
export const { setAccessToken } = userSlice.actions


// 导出selector
export const getAccessToken = (state: RootState) => state.user.accessToken
export default userSlice.reducer
