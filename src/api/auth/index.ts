import request from '@/utils/request'
import { ApiResponse } from '../../types'
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
}

export default authApi