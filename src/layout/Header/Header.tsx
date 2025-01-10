import { AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { useState } from 'react'
import { useAppSelector } from '@/store/hook'
import './Header.scss'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const clientId = useAppSelector((state) => state.user.clientId)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    // TODO: 实现退出登录逻辑
    handleMenuClose()
  }

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          消息管理系统
        </Typography>

        <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
          <Avatar alt={clientId} src={userInfo.avatar} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout}>
            <Logout fontSize="small" sx={{ mr: 1 }} />
            退出登录
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
