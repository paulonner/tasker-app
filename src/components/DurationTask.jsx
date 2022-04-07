import { Clock } from 'react-bootstrap-icons'

const DurationTask = ({ taskDuration }) => (
  <small className="text-muted d-flex align-items-center">
    <Clock /><span className="mx-2">{taskDuration}</span>
  </small>
)

export default DurationTask