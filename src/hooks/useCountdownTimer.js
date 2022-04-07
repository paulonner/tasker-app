import { useState, useEffect } from 'react'
import { getDuration } from '../helpers'

const useCountdownTimer = duration => {
  const [ countdown, setCountdown ] = useState(null)
  const [ timerInterval, setTimerInterval ] = useState(null)
  const [ start, setStart ] = useState(false)
  const [ finished, setFinished ] = useState(false)
  
  useEffect(() => {
    setCountdown(getDuration({ duration, type: 'milliseconds' }))
  }, [duration])

  useEffect(() => {
    if (!start) return
    
    setTimerInterval(setInterval(() => {
      setCountdown(timer => timer - 1000)
    }, 1000))

    return () => clearInterval(timerInterval)
  }, [start])

  useEffect(() => {
    if (countdown === 0 && start) {
      stopTimer()
      setFinished(true)
    }
  }, [countdown])

  const stopTimer = () => {
    if (start) {
      clearInterval(timerInterval)
      setStart(false)
    }
  }

  const continueTimer = () => {
    if (countdown > 0) setStart(true)
  }

  const time = getDuration({ duration: countdown, type: 'time' })
  
  const getTaskDuration = duration => {
    const timeDiff = getDuration({ duration, type: 'milliseconds' }) - countdown
    return getDuration({ duration: timeDiff, type: 'time' })
  }

  return {
    start,
    time,
    finished,
    countdown,
    stopTimer,
    continueTimer,
    getTaskDuration
  }
}

export default useCountdownTimer