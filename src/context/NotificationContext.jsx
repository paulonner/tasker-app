import { createContext, useState, useMemo } from 'react'
import NotifyComponent from '../components/Notify'

const NotificationContext = createContext({ notify: {} })

const NotificationProvider = ({ children }) => {
  const [ notify, setNotify ] = useState({
    show: false,
    message: '',
    type: 'success'
  })

  const Notify = useMemo(() => ({
    success: message => {
      setNotify({ show: true, message, type: 'success' })
    },
    error: message => {
      setNotify({ show: true, message, type: 'danger' })
    },
    close: () => setNotify({ show: false })
  }), [])

  return (
    <NotificationContext.Provider value={{ notify, Notify }}>
      <NotifyComponent />
      {children}
    </NotificationContext.Provider>
  )
}

export {
  NotificationContext,
  NotificationProvider
}