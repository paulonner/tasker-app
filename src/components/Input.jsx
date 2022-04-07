import { Form, FloatingLabel } from 'react-bootstrap'
import { useField } from "formik"

const Input = ({ label, required, ...props }) => {
  const [ field, meta ] = useField(props)
  
  return (
    <Form.Group className="mb-3">
      <FloatingLabel label={label}>
        <Form.Control
          size="lg"
          {...field}
          {...props}
          isInvalid={meta.touched && meta.error}
        />
      </FloatingLabel>
      <Form.Text as="span" className="text-danger">
        {meta.touched && meta.error}
      </Form.Text>
    </Form.Group>
  )
}

export default Input