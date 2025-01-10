import request from '../../utils/request'
import { ApiResponse } from '../../types'

interface Message {
  id: number
  content: string
  createAt: string
  accountName: string
}

interface MessageListResponse {
  records: Message[]
  total: number
}

const messageApi = {
  getMessageList: (): Promise<ApiResponse<MessageListResponse>> =>
    request.get('/api/v1/auth/mes'),

  createMessage: (data: { content: string }): Promise<ApiResponse<void>> =>
    request.post('/api/v1/auth/mes', data)
}

export default messageApi
