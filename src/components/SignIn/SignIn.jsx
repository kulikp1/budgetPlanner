import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import styles from './SignIn.module.css';

const SignIn = ({ onSwitch }) => {
  const navigate = useNavigate();

  const initialValues = {
    login: '',
    password: '',
  };

  const validationSchema = Yup.object({
    login: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.get('https://68646b9e5b5d8d03397d2d1d.mockapi.io/user');
      const foundUser = data.find(
        (user) => user.login === values.login || user.email === values.login
      );

      if (!foundUser) {
        toast.error('User not found');
        return;
      }

      const isMatch = await bcrypt.compare(values.password, foundUser.password);
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
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={false}
    >
      {({isSubmitting }) => (
        <Form className={styles.form}>
          <h2>Sign In</h2>

          <Field name="login">
            {({ field, meta, form }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder="Username or Email"
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
      )}
    </Formik>
  );
};

export default SignIn;
