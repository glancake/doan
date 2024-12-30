import './App.css'
import routes from './router'
import { useRoutes,NavigateFunction,useNavigate } from 'react-router-dom'
import Layout from './layout'

export let customNavigate:NavigateFunction ;

function App() {
  customNavigate = useNavigate()
  const element = useRoutes(routes)

  return <>{element}</>
}

export default App
