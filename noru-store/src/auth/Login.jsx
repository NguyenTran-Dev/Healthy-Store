import React, { useState, useEffect } from 'react'
import { Button, Form } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../common/components/Input'
import FormControl from '../common/components/FormControl'
import { loginSchema } from '../validators/userSchema'
import { useSelector, useDispatch } from 'react-redux'
import { loginApi } from '../redux/reducer/authSlice'
import AlertCustomer from '../common/components/Alert'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const dataLogin = useSelector((state) => state.auth)
  const [open_alert, set_open_alert] = useState(false)
  const [color, set_color] = useState('success')
  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })
  useEffect(() => {
    if (dataLogin.status === 'error') {
      set_color('danger')
    } else if (dataLogin.status === 'success') {
      navigate('/')
    }
  }, [dataLogin])
  const loginHandler = async (data) => {
    await dispatch(loginApi(data))
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
        <h3 className="text-center">Sign In</h3>
        <Form onSubmit={handleSubmit(loginHandler)}>
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
          <Button type="submit" className="form-user--btn w-100">
            Sign In
          </Button>
        </Form>
        <div className="form-user--footer">
          <p>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
