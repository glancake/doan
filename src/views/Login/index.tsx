import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/hook'
import { setAccessToken } from '@/store/user/userSlice'
import { authApi } from '@/api'
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import './index.scss'
import Cookies from 'js-cookie'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [captchaImg, setCaptchaImg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [clientId, setClientId] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  // 获取验证码
  const fetchCaptcha = async () => {
    try {
      const res = await authApi.getCaptcha()
      const clientId: string = Cookies.get('client_id')
      console.log('clientId', clientId)
      setClientId(clientId)
      const imgUrl = window.URL.createObjectURL(res)
      setCaptchaImg(imgUrl)
    } catch (error) {
      console.error('获取验证码失败:', error)
    }
  }

  // 组件加载时获取验证码
  useEffect(() => {
    let mounted = true

    const initCaptcha = async () => {
      if (mounted) {
        await fetchCaptcha()
      }
    }

    initCaptcha()

    return () => {
      mounted = false
      if (captchaImg) {
        URL.revokeObjectURL(captchaImg)
      }
    }
  }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)

    try {
      const res = await authApi.login({
        account,
        password,
        captcha,
        clientId,
      })

      if (res.code === 200) {
        dispatch(setAccessToken(res.data.access_token))
        setOpenSnackbar(true)
        setTimeout(() => {
          navigate('/home')
        }, 1500)
      }
    } catch (error) {
      console.error('登录失败:', error)
      // 登录失败时刷新验证码
      fetchCaptcha()
      setCaptcha('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box className="login-container">
      <Container component="main" maxWidth="xs">
        <Paper className="login-paper">
          <Box className="logo-circle">
            <LockOutlinedIcon className="lock-icon" />
          </Box>

          <Typography component="h1" variant="h5" className="welcome-text">
            Welcome Back
          </Typography>

          <Box component="form" onSubmit={handleLogin} className="login-form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box className="captcha-container">
              <TextField
                required
                label="验证码"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="captcha-input"
              />
              <Box className="captcha-image-container">
                {captchaImg && (
                  <img
                    src={captchaImg}
                    alt="验证码"
                    className="captcha-image"
                    onClick={fetchCaptcha}
                  />
                )}
                <IconButton onClick={fetchCaptcha} size="small">
                  <RefreshIcon />
                </IconButton>
              </Box>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit-button"
              disabled={isLoading || !account || !password || !captcha}
            >
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          登录成功！
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Login
