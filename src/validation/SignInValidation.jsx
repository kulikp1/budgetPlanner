import * as Yup from 'yup';

const signInValidationSchema = Yup.object({
  login: Yup.string()
    .required('Login or email is required')
    .min(3, 'Too short'),
  password: Yup.string().required('Password is required'),
});

export default signInValidationSchema;
