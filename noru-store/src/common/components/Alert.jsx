import React, {useEffect} from 'react';
import { Alert } from 'reactstrap'

const AlertCustomer = (props) => {
  const { message, set_open_alert, open, color } = props
  useEffect(() => {
    const timer = setTimeout(() => {
      set_open_alert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [open]);
  return (
    <div className={`alert--customer ${open ? 'd-block' : 'd-none'}`}>
      <Alert color={color}>{message}</Alert>
    </div>
  )
}

export default AlertCustomer
