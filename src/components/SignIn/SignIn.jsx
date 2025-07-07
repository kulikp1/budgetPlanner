import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import styles from './SignIn.module.css';

const SignIn = ({ onSwitch }) => {
  return (
    <SignInForm onSwitch={onSwitch} />
  );
};

export default SignIn;

function SignInForm({ onSwitch }) {
  const navigate = useNavigate();

  const initialValues = {
    login: '',
    password: '',
  };

  const validationSchema = Yup.object({
    login: Yup.string()
      .required('Login or email is required')
      .min(3, 'Too short'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={false}
      onSubmit={async (values) => {
        try {
          const { data } = await axios.get(
            'https://68646b9e5b5d8d03397d2d1d.mockapi.io/user'
          );
          const foundUser = data.find(
            (user) =>
              user.login === values.login || user.email === values.login
          );

          if (!foundUser) {
            toast.error('User not found');
            return;
          }

          const isMatch = await bcrypt.compare(
            values.password,
            foundUser.password
          );
          if (!isMatch) {
            toast.error('Wrong password');
            return;
          }

          toast.success('🎉 Login successful!');
          localStorage.setItem('authUser', JSON.stringify(foundUser));
          navigate('/trackerPage');
        } catch (error) {
          console.error(error);
          toast.error('Login failed');
        }
      }}
    >
      {(formik) => {
        useRealTimeValidation(formik); // ✅ тепер це — у верхньому рівні

        const { errors, touched, isSubmitting, setFieldTouched } = formik;

        return (
          <Form className={styles.form}>
            <h2>Sign In</h2>

            <Field name="login">
              {({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder="Username or Email"
                    className={`${styles.input} ${
                      touched.login && errors.login ? styles.invalid : ''
                    }`}
                    onInput={(e) => {
                      field.onChange(e);
                      setFieldTouched('login', true, false);
                    }}
                    autoComplete="off"
                  />
                  {touched.login && errors.login && (
                    <div className={styles.error}>{errors.login}</div>
                  )}
                </>
              )}
            </Field>

            <Field name="password">
              {({ field }) => (
                <>
                  <input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className={`${styles.input} ${
                      touched.password && errors.password ? styles.invalid : ''
                    }`}
                    onInput={(e) => {
                      field.onChange(e);
                      setFieldTouched('password', true, false);
                    }}
                    autoComplete="off"
                  />
                  {touched.password && errors.password && (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                </>
              )}
            </Field>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              Sign In
            </button>

            <p className={styles.loginText}>
              Don’t have an account?{' '}
              <span className={styles.linkText} onClick={onSwitch}>
                Sign up
              </span>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
}

// ✅ Кастомний хук для валідації login на наявність у БД
function useRealTimeValidation({ values, setFieldError }) {
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!values.login || values.login.length < 3) return;

      try {
        const { data } = await axios.get(
          'https://68646b9e5b5d8d03397d2d1d.mockapi.io/user'
        );
        const found = data.find(
          (u) => u.login === values.login || u.email === values.login
        );
        if (!found) {
          setFieldError('login', 'User not found');
        }
      } catch (err) {
        console.error(err);
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [values.login, setFieldError]);
}
