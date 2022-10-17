import React from 'react';

const Input = (props) => {
  const { label, register, required, ...others } = props
  return (
    <div className="text-input">
      <input {...register(label, { required })} {...others} />
    </div>
  )
}

export default Input
