// import * as React from 'react';
import axios from 'axios'
import { store } from '@/store'
import { Snackbar, Alert } from '@mui/material'

axios.defaults.headers[ 'Content-Type' ] = 'application/json'

const BASEURL = import.meta.env.VITE_BASE_URL

// 创建axios实例
const service = axios.create({
  baseURL: BASEURL,
  timeout: 60 * 1000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从store中获取token
    const accessToken = store.getState().user.accessToken
    console.log('accessToken', accessToken)
    if (accessToken) {
      config.headers[ 'Authorization' ] = `Bearer ${accessToken}`
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
    return response.data
  },
  error => {




    return Promise.reject(error)
  }
)

export default service