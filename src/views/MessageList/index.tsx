import { useState, useEffect } from 'react'
import { messageApi } from '@/api'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
  Avatar,
  Divider,
  Fab,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CreateMessageDialog from './CreateMessageDialog'
import './index.scss'

interface Message {
  id: number
  content: string
  createAt: string
  accountName: string
}

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [openCreate, setOpenCreate] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data, code } = await messageApi.getMessageList()
      if (code) {
        setMessages(data.records)
      }
    } catch (error) {
      console.error('获取消息列表失败:', error)
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const handleCreateSuccess = () => {
    fetchMessages() // 重新加载消息列表
  }

  return (
    <Box className="message-list">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">消息列表</Typography>
        <Fab
          color="primary"
          size="medium"
          onClick={() => setOpenCreate(true)}
          sx={{ boxShadow: 2 }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Paper elevation={2} sx={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
        <List>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : messages.length === 0 ? (
            <Alert severity="info" sx={{ m: 2 }}>
              暂无消息
            </Alert>
          ) : (
            messages.map((message, index) => (
              <div key={message.id}>
                <ListItem alignItems="flex-start">
                  <Avatar sx={{ bgcolor: '#667eea', mr: 2 }}>
                    {message.accountName[0]?.toUpperCase()}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography component="span" variant="body1">
                          {message.accountName}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {formatDate(message.createAt)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'inline', mt: 1 }}
                      >
                        {message.content}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < messages.length - 1 && <Divider variant="inset" component="li" />}
              </div>
            ))
          )}
        </List>
      </Paper>

      <CreateMessageDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={handleCreateSuccess}
      />
    </Box>
  )
}

export default MessageList
