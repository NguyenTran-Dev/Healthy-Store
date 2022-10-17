import React, {useEffect, useState } from 'react'
import { Button, Form } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../common/components/Input'
import FormControl from '../common/components/FormControl'
import { registerSchema } from '../validators/userSchema'
import { useSelector, useDispatch } from 'react-redux'
import { registerApi } from '../redux/reducer/authSlice'
import AlertCustomer from '../common/components/Alert'

const Register = () => {
  const dispatch = useDispatch();
  const dataLogin = useSelector((state) => state.auth);
  const [open_alert, set_open_alert] = useState(false);
  const [color, set_color] = useState('success');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  })
  useEffect(() => {
    if (dataLogin.status === 'error') {
      set_color('danger')
    }
  }, [dataLogin])
  const onSubmit = (data) => {
    dispatch(registerApi(data));
    set_open_alert(true)

  }
  return (
    <>
      <AlertCustomer
        color={color}
        message={dataLogin.message}
        open={open_alert}
        set_open_alert={set_open_alert}
      />
      <div className="form-user box-shadow my-5">
        <h3 className="text-center">Sign Up</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl label="Full name" message={errors.full_name?.message}>
            <Input
              label="full_name"
              type="text"
              register={register}
              required
              placeholder="Enter full name"
            />
          </FormControl>
          <FormControl label="Email" message={errors.email?.message}>
            <Input
              label="email"
              type="email"
              register={register}
              required
              placeholder="Enter email"
            />
          </FormControl>
          <FormControl label="Password" message={errors.password?.message}>
            <Input
              label="password"
              type="password"
              register={register}
              required
              placeholder="Enter Password"
            />
          </FormControl>
          <FormControl label="Address" message={errors.address?.message}>
            <Input
              label="address"
              type="text"
              register={register}
              required
              placeholder="Enter address"
            />
          </FormControl>
          <FormControl
            label="Phone number"
            message={errors.phone_number?.message}
          >
            <Input
              label="phone_number"
              type="text"
              register={register}
              required
              placeholder="Enter phone number"
            />
          </FormControl>
          <Button type="submit" className="form-user--btn w-100">
            Sign Up
          </Button>
        </Form>
        <div className="form-user--footer">
          <p>
            Have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
