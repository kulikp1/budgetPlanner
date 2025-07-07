import React from 'react';
import Tracker from "../../components/Tracker/Tracker"
import styles from './TrackerPage.module.css';


const TrackerPage = () => {
  return (
    <div className={styles.container}>
      <Tracker/>
    </div>
  );
};

export default TrackerPage;
