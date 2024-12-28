import { RouteObject } from 'react-router-dom'
import Ech from '../views/Ech'
import MessageList from '../views/MessageList'
import Vs from '../views/Vs'
import Login from '../views/Login'
import Layout from '../layout'
import Forbidden from '../views/403'

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Ech />,
      },
      {
        path: '/message-list',
        element: <MessageList />,
      },
      {
        path: '/vs',
        element: <Vs />,
      },
    ],
  },
  {
    path: '/403',
    element: <Forbidden />,
  },
]

export default routes
