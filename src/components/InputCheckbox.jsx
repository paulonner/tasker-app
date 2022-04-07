import { Form } from 'react-bootstrap'

const InputCheck = ({ name, checks, onChange, checked }) => (
  <>
    <Form.Label className="me-2">Duración:</Form.Label>
    {checks.map(check => (
      <Form.Check
        key={check.value}
        inline
        label={check.label}
        name={name}
        type="radio"
        value={check.value}
        onChange={onChange}
        checked={checked === check.value}
      />
    ))}
  </>
)

export default InputCheck