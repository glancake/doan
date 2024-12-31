import request from '@/utils/request'

const authApi = {
  // 获取验证码图片
  getCaptcha() {
    return request({
      url: '/api/v1/getVerifyCode',
      method: 'get',
      responseType: 'blob',
      withCredentials: true,
    })
  },

  login: (credentials) => request.post('/api/v1/login', credentials),
}

export default authApi