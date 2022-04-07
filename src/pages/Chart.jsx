import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import ApexChart from 'react-apexcharts'
import { useQuery } from 'react-query'
import { getTasks } from '../requests'
import { groupBy, datesLastWeekFormat } from '../helpers'

const dayLists = {
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [],
  Fri: [],
  Sat: [],
  Sun: [],
}

const Chart = () => {
  const { data: tasks = [], isLoading } = useQuery('tasks', getTasks)
  const [ series, setSeries ] = useState({
    unstarted: dayLists,
    finished: dayLists,
    paused: dayLists,
  })

  useEffect(() => {
    if (!tasks.length) return
    const { unstarted = [], finished = [], paused = [] } = groupBy(tasks, 'status')
    const unstartedDays = groupBy(datesLastWeekFormat(unstarted, 'updated_at'), 'updated_at')
    const finishedDays = groupBy(datesLastWeekFormat(finished, 'updated_at'), 'updated_at')
    const pausedDays = groupBy(datesLastWeekFormat(paused, 'updated_at'), 'updated_at')
    setSeries(prev => ({
      ...prev,
      unstarted: { ...prev.unstarted, ...unstartedDays },
      finished: { ...prev.finished, ...finishedDays },
      paused: { ...prev.paused, ...pausedDays },
    }))
  }, [tasks])

  const state = {
    series: [
      {
        name: 'Completadas',
        data: [
          series.finished.Mon.length || 0,
          series.finished.Tue.length || 0,
          series.finished.Wed.length || 0,
          series.finished.Thu.length || 0,
          series.finished.Fri.length || 0,
          series.finished.Sat.length || 0,
          series.finished.Sun.length || 0
        ]
      },
      {
        name: 'Sin iniciar',
        data: [
          series.unstarted.Mon.length || 0,
          series.unstarted.Tue.length || 0,
          series.unstarted.Wed.length || 0,
          series.unstarted.Thu.length || 0,
          series.unstarted.Fri.length || 0,
          series.unstarted.Sat.length || 0,
          series.unstarted.Sun.length || 0
        ]
      },
      {
        name: 'Pausadas',
        data: [
          series.paused.Mon.length || 0,
          series.paused.Tue.length || 0,
          series.paused.Wed.length || 0,
          series.paused.Thu.length || 0,
          series.paused.Fri.length || 0,
          series.paused.Sat.length || 0,
          series.paused.Sun.length || 0
        ]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yaxis: {
        title: {
          text: 'Tareas Completadas'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: val => `${val} Tareas`
        }
      }
    }
  }

  if (isLoading) return <h1>Cargando...</h1>

  return (
    <Row className="justify-content-md-center mt-4">
      <Col md={6}>
        <ApexChart
          options={state.options}
          series={state.series}
          type="bar"
        />
      </Col>
    </Row>
  )
}

export default Chart