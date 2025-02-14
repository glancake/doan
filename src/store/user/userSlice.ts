import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'
interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface UserState {
  accessToken: string,
  refreshToken: string,
  clientId: string,
  userInfo: UserInfo
}

// 定义state初始值
const initialState: UserState = {
  accessToken: '',
  refreshToken: '',
  clientId: '',
  userInfo: null
}

// 创建slice
export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    },
    setClientId: (state, action: PayloadAction<string>) => {
      state.clientId = action.payload
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
    }
  }
})

// 导出action
export const { setAccessToken, setRefreshToken, setClientId, setUserInfo } = userSlice.actions


// 导出selector
export const getAccessToken = (state: RootState) => state.user.accessToken
export const getRefreshToken = (state: RootState) => state.user.refreshToken
export const getClientId = (state: RootState) => state.user.clientId
export const getUserInfo = (state: RootState) => state.user.userInfo
export default userSlice.reducer
