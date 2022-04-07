import { Form, FloatingLabel } from 'react-bootstrap'
import { useField } from "formik"

const Input = ({ label, required, ...props }) => {
  const [ field, meta ] = useField(props)

  return (
    <Form.Group>
      <FloatingLabel label={label}>
        <Form.Control
          as="textarea"
          style={{ height: '100px' }}
          {...field}
          {...props}
          isInvalid={meta.error}
        />
      </FloatingLabel>
      <Form.Text as="span" className="text-danger">
        {meta.error}
      </Form.Text>
    </Form.Group>
  )
}

export default Input