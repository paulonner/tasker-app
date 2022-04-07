import { Badge, Card, Row, Col } from 'react-bootstrap'
import { status, getDuration } from '../helpers'

const CardTask = ({ children, item }) => (
  <Card.Body>
    <Row>
      <Col xs={6} md={6}>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Badge className="me-2">
          {getDuration({ duration: item.created_at, type: 'date' })}
        </Badge>
        <Badge className="me-2">Duración {item.duration}</Badge>
      </Col>
      <Col xs={6} md={6} className="d-flex flex-column align-items-end justify-content-between">
        <Badge as="div" bg={status[item.status].color}>
          {status[item.status].label}
        </Badge>
        {children}
      </Col>
    </Row>
  </Card.Body>
)
export default CardTask