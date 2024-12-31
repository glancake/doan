// import * as React from 'react';
import axios from 'axios'
import { store } from '@/store'
import { setAccessToken } from '@/store/user/userSlice'
import { customNavigate } from '@/App.tsx'

axios.defaults.headers[ 'Content-Type' ] = 'application/json'

const BASEURL = import.meta.env.VITE_BASE_URL

// 定义白名单路径
const whiteList = [
  '/api/v1/login',
  '/api/v1/getVerifyCode'
]

// 创建axios实例
const service = axios.create({
  baseURL: BASEURL,
  timeout: 60 * 1000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 白名单中的请求不添加 token
    if (!whiteList.includes(config.url)) {
      const accessToken = store.getState().user.accessToken
      if (accessToken) {
        config.headers[ 'Authorization' ] = `Bearer ${accessToken}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // console.log('response', response.headers[ 'set-cookie' ])
    if (response.data.code !== 200) {
      store.dispatch({
        type: 'SHOW_SNACKBAR',
        payload: {
          message: response.data.message,
          severity: 'error'
        }
      })
      if (response.data.code === 403) {
        // 使用 MUI 的 Snackbar 显示错误信息
        store.dispatch({
          type: 'SHOW_SNACKBAR',
          payload: {
            message: '权限不足，请联系管理员',
            severity: 'error'
          }
        })
        return Promise.reject(new Error('权限不足'))
      }
    }

    return response.data
  },
  error => {
    if (error.status === 401) {
      store.dispatch(setAccessToken(''))
      // 使用路由跳转
      customNavigate('/login')
    }

    return Promise.reject(error)
  }
)

export default service