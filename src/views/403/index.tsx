import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const Forbidden: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box className="forbidden-page">
      <Typography variant="h1" color="error">
        403
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mt: 2 }}>
        权限不足，无法访问该页面
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
        sx={{ mt: 4 }}
      >
        返回首页
      </Button>
    </Box>
  )
}

export default Forbidden 