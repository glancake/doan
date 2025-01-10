import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigation } from '../index'

const Aside: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <List>
      {navigation.map((item, index) => {
        if (item.kind === 'divider') {
          return <Divider key={`divider-${index}`} />
        }

        return (
          <ListItem key={item.segment} disablePadding>
            <ListItemButton
              selected={location.pathname.includes(item.segment)}
              onClick={() => navigate(`/${item.segment}`)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export default Aside
