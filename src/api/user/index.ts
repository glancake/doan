import request from '@/utils/request'
import type { ApiResponse } from '../../types/index'
const userApi = {
  // 获取用户信息
  getUserInfo(): Promise<ApiResponse<any>> {
    return request({
      url: '/api/v1/auth/user/user_info',
      method: 'get'
    })
  }
}

export default userApi