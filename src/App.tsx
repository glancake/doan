import './App.css'
import routes from './router'
import { useRoutes } from 'react-router-dom'
import Layout from './layout'

function App() {
  const element = useRoutes(routes)

  return <>{element}</>
}

export default App
