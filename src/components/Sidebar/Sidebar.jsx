import React from 'react';
import styles from './Sidebar.module.css';
import {
  FaHome,
  FaChartBar,
  FaMoneyBillWave,
  FaCog,
} from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>💸 Tracker</div>
      <nav className={styles.nav}>
        <a href="#" className={styles.active}><FaHome /> Dashboard</a>
        <a href="#"><FaChartBar /> Analytics</a>
        <a href="#"><FaMoneyBillWave /> Transactions</a>
        <a href="#"><FaCog /> Settings</a>
      </nav>
      <div className={styles.user}>
        <small>Logged in as</small><br />
        <strong>you@example.com</strong>
      </div>
    </aside>
  );
}
