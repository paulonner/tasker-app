import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Container, Breadcrumb } from 'react-bootstrap'
import Home from './pages/Home'
import TaskListComplete from './pages/TaskListComplete'
import Chart from './pages/Chart'

function App () {
  const navigate = useNavigate()
  const location = useLocation()
  const paths = [
    {
      name: 'Tareas',
      route: '/'
    },
    {
      name: 'Completadas',
      route: '/historico'
    },
    {
      name: 'Reporte',
      route: '/reporte'
    },
  ]

  return(
    <Container>
      <Breadcrumb>
        {paths.map(path => (
          <Breadcrumb.Item
            key={path.route}
            onClick={() => navigate(path.route)}
            active={location.pathname === path.route}
          >
            {path.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="historico" element={<TaskListComplete />} />
        <Route path="reporte" element={<Chart />} />
      </Routes>
    </Container>
  )
}

export default App
