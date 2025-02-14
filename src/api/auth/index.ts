import request from '@/utils/request'
import { ApiResponse } from '../../types'
import { store } from '@/store'
const authApi = {
  // 获取验证码图片
  getCaptcha(): Promise<Blob> {
    return request({
      url: '/api/v1/getVerifyCode',
      method: 'get',
      responseType: 'blob',
      withCredentials: true,
    })
  },

  login: (credentials): Promise<ApiResponse<any>> => request.post('/api/v1/login', credentials),
  // 刷新token
  refreshToken: (): Promise<ApiResponse<any>> => request.post(
    '/api/v1/refresh-token', null, { headers: { 'X-Refresh-Token': store.getState().user.refreshToken } }
  )
}
export default authApi