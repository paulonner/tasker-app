import { Badge } from 'react-bootstrap'
import { PlayCircle, PauseCircle, ArrowClockwise } from 'react-bootstrap-icons'

const CountdownTimer = ({ className, start, time, pauseTime, continueTimer, restartTime }) => (
  <Badge className={className}>
    <span className="timer">{time}</span>
    {start ?
      <PauseCircle className="counter-button" onClick={pauseTime} /> :
      <PlayCircle className="counter-button" onClick={continueTimer} />
    }
    {!start &&
      <ArrowClockwise className="counter-button" onClick={restartTime} disabled />
    }
  </Badge>
)

export default CountdownTimer