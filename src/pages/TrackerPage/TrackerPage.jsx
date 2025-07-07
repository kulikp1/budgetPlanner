import React from 'react';
import Tracker from "../../components/Tracker/Tracker"
import styles from './TrackerPage.module.css';


const TrackerPage = () => {
  return (
    <div className={styles.container}>
       <div className={styles.left}>
      <Tracker/>
      </div>
      <div className={styles.right}><div> <h1>Test</h1></div> </div>

    </div>
  );
};

export default TrackerPage;
