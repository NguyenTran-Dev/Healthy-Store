import React from 'react'
import { FormGroup, Label } from 'reactstrap'

const FormControl = (props) => {
  const { label, children, message } = props
  return (
    <FormGroup>
      {require && <span className="text-danger">*</span>}
      <Label for={label}>{label}</Label>
      {children}
      {message && <p className="text-danger mt-1 mb-0">{message}</p>}
    </FormGroup>
  )
}

export default FormControl
