import { useContext, useState } from 'react'
import { Badge, Spinner, Dropdown } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import EmptyList from '../components/EmptyList'
import TaskItem from '../components/TaskItem'
import { useQuery } from 'react-query'
import { NotificationContext } from '../context/NotificationContext'
import { getTasks, updateOrderTasks } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { reorder, filterTasksByDuration, filterTranslate } from '../helpers'

const TaskList = ({ setSelectedTask }) => {
  const queryClient = useQueryClient()
  const { Notify } = useContext(NotificationContext)
  const [ filter, setFilter ] = useState('all')
  const { data = [], isLoading, isError } = useQuery(['tasks'], getTasks)
  
  const mutation = useMutation(updateOrderTasks, {
    onSuccess: () => Notify.success('Lista de Tarea Ordenada Correctamente'),
    onError: () => Notify.error('Error al Ordenar Lista de Tareas')
  })

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return
    if (source.index === destination.index && source.droppableId === destination.droppableId) return
    const sourceTask = tasks[source.index]
    const destinationTask = tasks[destination.index]

    const reorderTasks = [
      {
        ...destinationTask,
        id: sourceTask.id,
      },
      {
        ...sourceTask,
        id: destinationTask.id,
      }
    ]

    queryClient.setQueryData(['tasks'], reorder(tasks, reorderTasks))
    mutation.mutate(reorderTasks)
  }

  const tasks = data.filter(
    task => task.status !== 'finished' && filterTasksByDuration(task.duration, filter)
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="m-0">Lista de tareas <Badge>{tasks.length}</Badge></h1>
        <Dropdown>
          <Dropdown.Toggle>{filterTranslate[filter]}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilter('all')}>Todas</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('short')}>Corto</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('medium')}>Medio</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('long')}>Largo</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {tasks.length ?
        <Droppable droppableId="tasks">
          {droppableProvided => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {draggableProvided => (
                    <TaskItem
                      item={task}
                      setSelectedTask={setSelectedTask}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      innerRef={draggableProvided.innerRef}
                    />
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable> :
        <EmptyList
          title={isLoading && 'Cargando' || isError && 'Error al obtener tareas'}
          text={isLoading && 'Consultando tareas' || isError && 'Verificar la conexión al servidor'}
          spinner={isLoading && <Spinner animation="border" />}
        />
      }
    </DragDropContext>
  )
}

export default TaskList