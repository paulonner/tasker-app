import { Card } from 'react-bootstrap'

const EmptyList = ({ title, text, spinner }) => (
  <Card className="mt-2">
    <Card.Body className="text-center">
      <Card.Title>{spinner} <div>{title || 'No existen tareas.'}</div></Card.Title>
      <Card.Text>{text || 'Agrega nuevas tareas para mostrarlas en el listado.'}</Card.Text>
    </Card.Body>
  </Card>
)

export default EmptyList