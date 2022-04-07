
import { useContext, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { ButtonGroup, Button, Card } from 'react-bootstrap'
import { Trash, Pencil, CheckCircle } from 'react-bootstrap-icons'
import Tooltip from '../components/Tooltip'
import CardTask from '../components/CardTask'
import CountdownTimer from '../components/CountdownTimer'
import DurationTask from '../components/DurationTask'
import useCountdownTimer from '../hooks/useCountdownTimer'
import { NotificationContext } from '../context/NotificationContext'
import { removeTask, upsertTask } from '../requests'
import { NotifyMessage, status } from '../helpers'

const TaskItem = ({ item, setSelectedTask, innerRef, ...props }) => {
  const { Notify } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const {
    start,
    time,
    finished,
    stopTimer,
    continueTimer,
    getTaskDuration
  } = useCountdownTimer(item.time_inprogress || item.duration)

  useEffect(() => {
    if (start) mutation.mutate({ ...item, status: 'inprogress' })
    if (finished) updateTask('finished')
  }, [start, finished])

  const remove = useMutation(removeTask, {
    onSuccess: () => {
      stopTimer()
      queryClient.invalidateQueries('tasks')
      Notify.success(NotifyMessage.DELETE)
    },
    onError: () => Notify.error(NotifyMessage.DELETE_ERROR)
  })

  const mutation = useMutation(upsertTask, {
    onSuccess: (_, task) => {
      queryClient.invalidateQueries('tasks')
      task.status === 'paused' && Notify.success(NotifyMessage.SUCCESS_PAUSED)
      task.status === 'finished' && Notify.success(NotifyMessage.SUCCESS_COMPLETE)
    },
    onError: () => Notify.error(NotifyMessage.EDIT_ERROR)
  })

  const updateTask = status => {
    mutation.mutate({
      ...item,
      status,
      time_inprogress: time,
      task_duration: status === 'finished' ? getTaskDuration(item.duration) : item.task_duration,
      updated_at: new Date()
    })
    stopTimer()
  }

  const restartTime = () => {
    mutation.mutate({ ...item, time_inprogress: '', status: 'unstarted' })
  }

  const pauseTime = () => {
    const { status } = queryClient.getQueryData(['tasks']).find(task => task.id === item.id)
    status === 'inprogress' && updateTask('paused')
  }

  const selectTask = item => {
    pauseTime()
    setSelectedTask(item)
    window.scrollTo(0, 0)
  }

  return (
    <Card
      className="mt-2"
      {...props}
      ref={innerRef}
      border={status[item.status].color}
    >
      <CardTask item={item}>
        <ButtonGroup>
          <Tooltip text="Editar tarea" >
            <Button
              size="sm"
              className="pt-0"
              variant="outline-primary"
              disabled={item.status === 'finished'}
              onClick={() => selectTask(item)}
            >
              <Pencil />
            </Button>
          </Tooltip>
          <Tooltip text="Eliminar tarea" >
            <Button
              size="sm"
              variant="outline-primary"
              className="pt-0"
              onClick={() => remove.mutate(item.id)}
            >
              <Trash />
            </Button>
          </Tooltip>
          <Tooltip text="Completar tarea" >
            <Button
              size="sm"
              variant="outline-primary"
              className="pt-0"
              disabled={item.status === 'finished' || item.status === 'unstarted'}
              onClick={() => updateTask('finished')}
            >
              <CheckCircle />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </CardTask>
      <Card.Footer className="d-flex flex-column">
        {item.status === 'finished' ?
          <DurationTask taskDuration={item.task_duration} /> :
          <CountdownTimer
            className="align-self-end"
            start={start}
            time={time}
            pauseTime={pauseTime}
            continueTimer={continueTimer}
            restartTime={restartTime}
          />
        }
      </Card.Footer>
    </Card>
  )
}

export default TaskItem