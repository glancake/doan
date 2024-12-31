import request from '@/utils/request.js'


const messageApi = {
  getMessageList: () => request.get('/api/v1/auth/mes'),
  createMessage: (data) => request.post('/api/v1/auth/mes', data)
}

export default messageApi