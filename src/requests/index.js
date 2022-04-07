import axios from '../services/axios'

export const getTasks = async () => {
  const { data } = await axios.get('/tasks')
  return data
}

export const upsertTask = (form) => {
  const method = !form.id ? 'post' : 'put'
  return axios[method](`/tasks/${form.id || ''}`, form)
}

export const removeTask = taskId => axios.delete(`/tasks/${taskId}`)

export const updateOrderTasks = ([source, destination]) => {
  return Promise.all([upsertTask(source), upsertTask(destination)])
}