import React from 'react';
import SignUp from '../../components/SignUp/SignUp'; 

import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.textBlock}>
          <h1>Start managing your budget smarter</h1>
          <p>Track income, control expenses, and set financial goals — all in one app.</p>
        </div>
      </div>
      <SignUp />
    </div>
  );
};

export default HomePage;
