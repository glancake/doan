import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Divider
} from '@mui/material'
import {
  Home as HomeIcon,
  Message as MessageIcon,
  Compare as CompareIcon,
} from '@mui/icons-material'
import './Aside.scss'

const menuItems = [
  { path: '/home', label: '首页', icon: <HomeIcon /> },
  { path: '/message-list', label: '消息列表', icon: <MessageIcon /> },
  { path: '/vs', label: '对比', icon: <CompareIcon /> },
]

const Aside: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  return (
    <Drawer
      variant="permanent"
      className="aside"
      classes={{
        paper: 'aside-paper'
      }}
    >
      <Box className="logo-container">
        <img src="/logo.svg" alt="Logo" height="32" />
      </Box>
      <Divider />
      <List component="nav">
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Aside 