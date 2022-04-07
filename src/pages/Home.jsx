import { useState, useContext } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { useMutation, useQueryClient } from 'react-query'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import TaskList from '../components/TaskList'
import InputCheckbox from '../components/InputCheckbox'
import { Formik, Form } from 'formik'
import { upsertTask } from '../requests'
import { validationTask } from '../schemas'
import { NotificationContext } from '../context/NotificationContext'
import { NotifyMessage } from '../helpers'



const Home = () => {
  const { Notify } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const [ selectedTask, setSelectedTask ] = useState({})
  
  const mutation = useMutation(upsertTask, {
    onSuccess: (_, task) => {
      queryClient.invalidateQueries('tasks')
      Notify.success(!task.id ? NotifyMessage.SUCCESS_CREATE : NotifyMessage.SUCCESS_EDIT)
    },
    onError: () => Notify.error(NotifyMessage.ERROR)
  })

  const onSubmit = values => {
    const task = queryClient.getQueryData(['tasks']).find(task => task.id === selectedTask.id)
    const time_inprogress = values.duration === selectedTask.duration ? task.time_inprogress : ''
    const status = time_inprogress ? task.status : 'unstarted'
    mutation.mutate({ ...values, time_inprogress, status })
    setSelectedTask({})
  }

  return (
    <>
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <Formik
            enableReinitialize
            initialValues={{
              id: selectedTask.id || '',
              name: selectedTask.name || '',
              duration: selectedTask.duration || '',
              description: selectedTask.description || '',
              task_duration: '',
              created_at: selectedTask.created_at || new Date(),
              updated_at: new Date()
            }}
            validationSchema={validationTask}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form noValidate>
                <Input
                  name="name"
                  label="Nombre de Tarea"
                  placeholder="Nombre de Tarea"
                />
                <InputCheckbox
                  name="duration"
                  checks={[
                    {
                      label: 'Corto',
                      value: '00:30'
                    },
                    {
                      label: 'Medio',
                      value: '00:45'
                    },
                    {
                      label: 'Largo',
                      value: '01:00'
                    }
                  ]}
                  onChange={e => setFieldValue('duration', e.target.value)}
                  checked={values.duration}
                />
                <Input
                  name="duration"
                  label="Duración (hh:mm)"
                  placeholder="Duración"
                />
                <TextArea 
                  name="description"
                  label="Descripción"
                  placeholder="Descripción"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2"
                >
                  Guardar
                </Button>
                <Button
                  className="mt-2 ms-2"
                  variant="outline-primary"
                  onClick={() => setSelectedTask({})}
                >
                  Cancelar
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      {/* TODO: Refactor */}
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <TaskList
            setSelectedTask={setSelectedTask}
          />
        </Col>
      </Row>
    </>
  )
}

export default Home
