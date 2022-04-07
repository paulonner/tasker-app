import { useContext } from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'
import { NotificationContext } from '../context/NotificationContext'

const Notify = () => {
  const { notify, Notify } = useContext(NotificationContext)

  return (
    <ToastContainer position="top-end" className="position-fixed end-0 pt-4 me-4">
      <Toast
        bg={notify.type}
        className="text-white"
        style={{ zIndex: 11 }}
        onClose={() => Notify.close()}
        show={notify.show}
        delay={3000}
        autohide
      >
        <Toast.Header closeButton>
          <strong className="me-auto">Mensaje</strong>
        </Toast.Header>
        <Toast.Body>
          {notify.message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Notify