import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material'
import { messageApi } from '@/api'

interface CreateMessageDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

const CreateMessageDialog: React.FC<CreateMessageDialogProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim()) return
    
    setLoading(true)
    try {
      const res = await messageApi.createMessage({ content })
      if (res.code === 200) {
        onSuccess()
        onClose()
        setContent('')
      }
    } catch (error) {
      console.error('创建消息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>发布新消息</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            label="消息内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          取消
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !content.trim()}
        >
          {loading ? '发送中...' : '发送'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateMessageDialog 