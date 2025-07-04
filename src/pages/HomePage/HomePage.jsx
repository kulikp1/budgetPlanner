import React, { useState } from 'react';
import styles from './HomePage.module.css';
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';

const HomePage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => setIsSignUp((prev) => !prev);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.textBlock}>
          <h1>Start managing your budget smarter</h1>
          <p>Track income, control expenses, and set financial goals — all in one app.</p>
        </div>
      </div>

      <div className={styles.right}>
        {isSignUp ? (
          <SignUp onSwitch={toggleForm} />
        ) : (
          <SignIn onSwitch={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
