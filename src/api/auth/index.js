import request from '@/utils/request.js'


const authApi = {
  login: (credentials) => request.post('/api/v1/login', credentials),
}

export default authApi