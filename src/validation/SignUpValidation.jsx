import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Required')
    .test(
      'checkDuplicateEmail',
      'Email already in use',
      async (value) => {
        if (!value) return false;
        try {
          const { data } = await axios.get(
            'https://68646b9e5b5d8d03397d2d1d.mockapi.io/user'
          );
          return !data.some((u) => u.email === value);
        } catch (error) {
            console.log(error)
          return true; 
        }
      }
    ),
  login: Yup.string()
    .min(3, 'Minimum 3 characters')
    .required('Required')
    .test(
      'checkDuplicateLogin',
      'Username already taken',
      async (value) => {
        if (!value) return false;
        try {
          const { data } = await axios.get(
            'https://68646b9e5b5d8d03397d2d1d.mockapi.io/user'
          );
          return !data.some((u) => u.login === value);
        } catch (error) {
            console.log(error)
          return true;
        }
      }
    ),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  agree: Yup.bool()
    .oneOf([true], 'You must accept the terms'),
});

export default validationSchema;
