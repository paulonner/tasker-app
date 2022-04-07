const fs = require('fs')
const moment = require('moment')
const durations = ['00:30:00', '00:45:00', '01:00:00']

const resolveTime = ({ duration, type }) => {
  const format = {
    milliseconds: Math.round(moment.duration(duration).asMilliseconds()),
    time: moment.utc(moment.duration(duration).asMilliseconds()).format('HH:mm:ss')
  }

  return format[type]
}

const getRandomDuration = () => {
  const duration = Math.floor(Math.random() * durations.length)
  return durations[duration]
}

const getProgressTask = () => {
  const min = 80, max = 100, duration = getRandomDuration()
  const milliseconds = resolveTime({ duration, type: 'milliseconds' })
  const value = Math.floor(Math.random() * (max - min + 1) + min)
  const taskDuration = milliseconds * value / 100
  return {
    duration,
    task_duration: resolveTime({ duration: taskDuration, type: 'time' })
  }
}

const getDate = () => {
  const startDateLastWeek = moment.utc(moment().startOf('isoWeek')).format('YYYY-MM-DD')
  const endDateLastWeek = moment.utc(moment().endOf('isoWeek')).format('YYYY-MM-DD')
  const startDate = new Date(startDateLastWeek)
  const endDate = new Date(endDateLastWeek)
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
}

const tasks = Array(50).fill('finished').map((status, i) => {
  const { duration, task_duration } = getProgressTask()
  const created_at = getDate()
  return {
    id: i + 1,
    name: `Tarea ${i + 1}`,
    duration,
    description: `Descripción tarea ${i + 1}`,
    status,
    task_duration,
    created_at,
    updated_at: created_at
  }
})

fs.writeFileSync(__dirname + '/db.json', JSON.stringify({ tasks }, null, 2))