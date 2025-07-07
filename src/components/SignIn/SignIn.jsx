import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import styles from './SignIn.module.css';
import signInValidationSchema from '../../validation/SignInValidation';
import useRealTimeValidation from '../../hooks/useRealTimeValidation';

const SignIn = ({ onSwitch }) => {
  return <SignInWrapper onSwitch={onSwitch} />;
};

export default SignIn;

function SignInWrapper({ onSwitch }) {
  const navigate = useNavigate();

  const initialValues = {
    login: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInValidationSchema}
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
      {(formik) => <SignInForm onSwitch={onSwitch} formik={formik} />}
    </Formik>
  );
}

function SignInForm({ onSwitch, formik }) {
  const { values, setFieldError, touched, errors, isSubmitting, setFieldTouched } = formik;

  useRealTimeValidation({ values, setFieldError }); // ✅ Correct usage of Hook

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

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
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
}
