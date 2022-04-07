import { Fragment } from 'react'
import { Card, Row, Col, Spinner, Badge } from 'react-bootstrap'
import CardTask from '../components/CardTask'
import DurationTask from '../components/DurationTask'
import EmptyList from '../components/EmptyList'
import { useQuery } from 'react-query'
import { getTasks } from '../requests'

const TaskListComplete = () => {
  const { data = [], isLoading, isError } = useQuery(['tasks'], getTasks)
  const tasks = data.filter(task => task.status === 'finished')

  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <h1>Tareas completadas <Badge>{tasks.length}</Badge></h1>
        {tasks.length ?
          <>
            {tasks.map(item => (
              <Fragment key={item.id}>
                <Card className="mt-2" border="success">
                  <CardTask item={item} />
                  <Card.Footer>
                    <DurationTask taskDuration={item.task_duration} />
                  </Card.Footer>
                </Card>
              </Fragment>
            ))}
          </> :
          <EmptyList
            title={isLoading && 'Cargando' || isError && 'Error al obtener tareas'}
            text={isLoading && 'Consultando tareas' || isError && 'Verificar la conexión al servidor'}
            spinner={isLoading && <Spinner animation="border" />}
          />
        }
      </Col>
    </Row>
  )
}

export default TaskListComplete