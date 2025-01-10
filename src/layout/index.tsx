import { Outlet } from 'react-router-dom'
import { AppBar, Box, CssBaseline, Drawer, Toolbar } from '@mui/material'
import { Description as DescriptionIcon } from '@mui/icons-material'
import Header from './Header/Header'
import Aside from './Aside/Aside'
import './index.scss'

export const navigation = [
  {
    segment: 'home',
    title: '首页',
    icon: <DescriptionIcon />,
  },
  { kind: 'divider' },
  {
    segment: 'message-list',
    title: '消息列表',
    icon: <DescriptionIcon />,
  },
  {
    segment: 'vs',
    title: '对比',
    icon: <DescriptionIcon />,
  },
]

const drawerWidth = 240

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Header />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar /> {/* 为AppBar留出空间 */}
        <Aside />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* 为AppBar留出空间 */}
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
