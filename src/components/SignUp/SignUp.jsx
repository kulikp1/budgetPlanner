/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import styles from './SignUp.module.css';
import validationSchema from '../../validation/SignUpValidation';

const SignUp = ({ onSwitch }) => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    login: '',
    password: '',
    confirmPassword: '',
    agree: false,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const hashedPassword = await bcrypt.hash(values.password, 10);
      const response = await axios.post(
        'https://68646b9e5b5d8d03397d2d1d.mockapi.io/user',
        {
          email: values.email,
          login: values.login,
          password: hashedPassword,
        }
      );

      toast.success('Registration successful!');
      localStorage.setItem('authUser', JSON.stringify(response.data));
      resetForm();
      navigate('/trackerPage');
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={false}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form}>
          <h2>Create Account</h2>

          <Field name="email">
            {({ field, meta, form }) => (
              <>
                <input
                  {...field}
                  type="email"
                  placeholder="Email Address"
                  className={`${styles.input} ${
                    meta.touched && meta.error ? styles.invalid : ''
                  }`}
                  onInput={() => form.setFieldTouched('email', true, false)}
                />
                {meta.touched && meta.error && (
                  <div className={styles.error}>{meta.error}</div>
                )}
              </>
            )}
          </Field>

          <Field name="login">
            {({ field, meta, form }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder="Username"
                  className={`${styles.input} ${
                    meta.touched && meta.error ? styles.invalid : ''
                  }`}
                  onInput={() => form.setFieldTouched('login', true, false)}
                />
                {meta.touched && meta.error && (
                  <div className={styles.error}>{meta.error}</div>
                )}
              </>
            )}
          </Field>

          <Field name="password">
            {({ field, meta, form }) => (
              <>
                <input
                  {...field}
                  type="password"
                  placeholder="Password"
                  className={`${styles.input} ${
                    meta.touched && meta.error ? styles.invalid : ''
                  }`}
                  onInput={() => form.setFieldTouched('password', true, false)}
                />
                {meta.touched && meta.error && (
                  <div className={styles.error}>{meta.error}</div>
                )}
              </>
            )}
          </Field>

          <Field name="confirmPassword">
            {({ field, meta, form }) => (
              <>
                <input
                  {...field}
                  type="password"
                  placeholder="Repeat Password"
                  className={`${styles.input} ${
                    meta.touched && meta.error ? styles.invalid : ''
                  }`}
                  onInput={() =>
                    form.setFieldTouched('confirmPassword', true, false)
                  }
                />
                {meta.touched && meta.error && (
                  <div className={styles.error}>{meta.error}</div>
                )}
              </>
            )}
          </Field>

          <label className={styles.checkbox}>
            <Field type="checkbox" name="agree" />
            <span>
              I agree with <a href="#">Terms of Service</a>
            </span>
          </label>
          {touched.agree && errors.agree && (
            <div className={styles.error}>{errors.agree}</div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
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
