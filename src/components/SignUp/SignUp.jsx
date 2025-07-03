import React, { useState } from 'react';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [form, setForm] = useState({ email: '', login: '', password: '', agree: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.agree) {
      console.log('Registering:', form);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.textBlock}>
          <h1>Start managing your budget smarter</h1>
          <p>Track income, control expenses, and set financial goals — all in one app.</p>
        </div>
      </div>

      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="login"
            placeholder="Username"
            value={form.login}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
            />
            <span>I agree with <a href="#">Terms of Service</a></span>
          </label>
          <button type="submit" className={styles.submitBtn}>Sign Up</button>
          <p className={styles.loginText}>
            Already have an account? <a href="#">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
