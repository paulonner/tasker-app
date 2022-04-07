import moment from 'moment'

export const getDuration = ({ duration, type = 'milliseconds' }) => {
  const format = {
    milliseconds: Math.round(moment.duration(duration).asMilliseconds()),
    time: moment.utc(moment.duration(duration).asMilliseconds()).format('HH:mm:ss'),
    date: moment(new Date(duration)).format('DD MMMM YYYY')
  }

  return format[type]
}

export const status = {
  unstarted: {
    label: 'Sin iniciar',
    color: 'info'
  },
  inprogress: {
    label: 'En Progreso',
    color: 'warning'
  },
  paused: {
    label: 'En pausa',
    color: 'warning'
  },
  finished: {
    label: 'Finalizada',
    color: 'success'
  }
}

export const reorder = (list, [source, destination]) => {
  return list.map(item => (
    item.id === source.id && source ||
    item.id === destination.id && destination || item
  ))
}

export const NotifyMessage = {
  SUCCESS_CREATE: 'Tarea Creada Correctamente',
  SUCCESS_EDIT: 'Tarea Actualizada Correctamente',
  SUCCESS_COMPLETE: 'Tarea Finalizada',
  SUCCESS_PAUSED: 'Tarea Pausada',
  ERROR: 'Error al Guardar Cambios',
  DELETE: 'Tarea Eliminada Correctamente',
  DELETE_ERROR: 'Error al Eliminar Tarea',
  EDIT_ERROR: 'Error al Actualizar Tarea'
}

export const filterTasksByDuration = (duration, filter) => {
  const inDuration = getDuration({ duration })
  const short = getDuration({ duration: '00:30' })
  const medium = getDuration({ duration: '01:00' })

  return (
    filter === 'short' && inDuration <= short ||
    filter === 'medium' && inDuration > short && inDuration <= medium ||
    filter === 'long' && inDuration > medium ||
    filter === 'all'
  )
}

export const filterTranslate = ({
  all: 'Duración',
  short: 'Corto',
  medium: 'Medio',
  long: 'Largo'
})

export const groupBy = (arr, key) => {
  return arr.reduce((group, value) => {
    const { [key]: k } = value
    group[k] = group[k] ?? []
    group[k].push(value)
    return group
  }, {})
}

export const datesInLastWeek = date => {
  const startDate = moment.utc(moment().startOf('isoWeek')).format('YYYY-MM-DD')
  const endDate = moment.utc(moment().endOf('isoWeek')).format('YYYY-MM-DD')
  return moment(date).isBetween(startDate, endDate, null, '[]')
}

export const datesLastWeekFormat = (arr, key) => arr
  .filter(item => datesInLastWeek(item.updated_at))
  .map(item => ({ ...item, [key]: moment(item.updated_at).format('ddd') }))