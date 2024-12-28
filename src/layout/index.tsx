import { Outlet } from 'react-router-dom'
import Aside from './Aside/Aside'
import './index.scss'

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Aside />
      <div className="main">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
