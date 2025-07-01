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
      // Реєстрація / API виклик тут
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.overlay}>
          <h1>Don't have an account?</h1>
          <p>
            Register to access all the features of our service. <br />
            Manage your business in one place. It's free!
          </p>
          <div className={styles.socials}>
            <i className="fab fa-vk"></i>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-google"></i>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <input
            type="email"
            name="email"
            placeholder="E mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="login"
            placeholder="Login"
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
            />
            <span>I agree to all the statements in <a href="#">Terms of service</a></span>
          </label>
          <button type="submit" className={styles.submitBtn}>Sign up ➤</button>
          <p className={styles.loginText}>Have an account? <a href="#">Sign in</a></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
