import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { store } from '../store'
import { setAccessToken, setRefreshToken } from '../store/user/userSlice'
import { customNavigate } from '../App'
import { authApi } from '@/api'

// Request Queue
let isRefreshing = false;
let requestQueue: any[] = [];

// 类型定义
interface ApiResponse<T = any> {
  code: number
  message?: string
  data: T
}

interface ErrorResponse {
  status: number
  message: string
}

// 配置常量
const BASEURL = import.meta.env.VITE_BASE_URL
const TIMEOUT = 60 * 1000
const CONTENT_TYPE = 'application/json'

// 白名单路径
const WHITE_LIST = [
  '/api/v1/login',
  '/api/v1/getVerifyCode'
] as const

// 重试配置
const RETRY_COUNT = 3
const RETRY_DELAY = 1000

// 创建axios实例
const service = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': CONTENT_TYPE
  },
  // retry: RETRY_COUNT,
  // retryDelay: RETRY_DELAY
})

// 重试拦截器
service.interceptors.response.use(undefined, (error) => {
  const config = error.config

  // 如果未设置重试次数，则设置为默认值
  if (!config || !config.retry) {
    return Promise.reject(error)
  }

  // 设置重试次数
  config.__retryCount = config.__retryCount || 0

  // 检查是否达到最大重试次数
  if (config.__retryCount >= config.retry) {
    return Promise.reject(error)
  }

  // 增加重试计数器
  config.__retryCount += 1

  // 创建新的Promise来处理指数退避
  const delay = new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, config.retryDelay || 1000)
  })

  // 返回包含延迟的Promise
  return delay.then(() => service(config))
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 白名单中的请求不添加 token
    if (config.url && !WHITE_LIST.includes(config.url as typeof WHITE_LIST[number])) {
      const accessToken = store.getState().user.accessToken;
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
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
      if (response.data.code === 4006) {
        console.log('token过期了');
        // Add the request to the queue
        requestQueue.push(response.config);

        if (!isRefreshing) {
          isRefreshing = true;
          store.dispatch(setAccessToken(''))
          authApi.refreshToken().then(res => {
            if (res.code === 200) {
              store.dispatch(setAccessToken(res.data.access_token))
              store.dispatch(setRefreshToken(res.data.refresh_token))
              // Retry all queued requests
              requestQueue.forEach((req) => {
                service(req);
              });
              requestQueue = []; // Clear the queue
            }
          }).catch(err => {
            store.dispatch(setAccessToken(''))
            // 使用路由跳转
            customNavigate('/login')
          }).finally(() => {
            isRefreshing = false;
          });
        }
      }
    }

    return response.data
  },
  error => {
    store.dispatch({
      type: 'SHOW_SNACKBAR',
      payload: {
        message: '系统异常',
        severity: 'error'
      }
    })
    return Promise.reject(error)
  }
)

export default service
