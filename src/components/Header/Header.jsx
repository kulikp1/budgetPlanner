import React from "react";
import styles from "./Header.module.css";
import { FaBell } from "react-icons/fa";
import userImage from "../../assets/react.svg"; 

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.text}>
        <p className={styles.sub}>Hi Nanas,</p>
        <h1 className={styles.title}>Welcome to Peymen</h1>
      </div>
      <div className={styles.actions}>
        <div className={styles.notification}>
          <FaBell />
          <span className={styles.dot}></span>
        </div>
        <img src={userImage} alt="User Avatar" className={styles.avatar} />
      </div>
    </div>
  );
}
