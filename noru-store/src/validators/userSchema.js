import * as yup from "yup";

const registerSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
  full_name: yup.string().required(),
  address: yup.string().required(),
  phone_number: yup.string().required(),
}).required();

const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
}).required();

export { registerSchema, loginSchema };
