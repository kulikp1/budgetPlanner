import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './SignUp.module.css';

const SignIn = () => {
  const initialValues = {
    login: '',
    password: '',
  };

  const validationSchema = Yup.object({
    login: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values) => {
    console.log('Logging in:', values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <h2>Sign In</h2>

              <Field
                type="text"
                name="login"
                placeholder="Username or Email"
                className={styles.input}
              />
              <ErrorMessage name="login" component="div" className={styles.error} />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={styles.input}
              />
              <ErrorMessage name="password" component="div" className={styles.error} />

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
