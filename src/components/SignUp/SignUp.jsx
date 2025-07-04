import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './SignUp.module.css';

const SignUp = ({ onSwitch }) => {
  const initialValues = {
    email: '',
    login: '',
    password: '',
    agree: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    login: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password too short').required('Required'),
    agree: Yup.bool().oneOf([true], 'You must accept the terms'),
  });

  const handleSubmit = (values) => {
    console.log('Registering:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <h2>Create Account</h2>

          <Field type="email" name="email" placeholder="Email Address" className={styles.input} />
          <ErrorMessage name="email" component="div" className={styles.error} />

          <Field type="text" name="login" placeholder="Username" className={styles.input} />
          <ErrorMessage name="login" component="div" className={styles.error} />

          <Field type="password" name="password" placeholder="Password" className={styles.input} />
          <ErrorMessage name="password" component="div" className={styles.error} />

          <label className={styles.checkbox}>
            <Field type="checkbox" name="agree" />
            <span>I agree with <a href="#">Terms of Service</a></span>
          </label>
          <ErrorMessage name="agree" component="div" className={styles.error} />

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            Sign Up
          </button>

          <p className={styles.loginText}>
  Already have an account?{' '}
  <span className={styles.linkText} onClick={onSwitch}>
    Sign in
  </span>
</p>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
