import React from "react";
import styles from "./StatsPanel.module.css";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaBalanceScale,
} from "react-icons/fa";

export default function StatsPanel({ income, expense, balance }) {
  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <FaMoneyBillWave className={styles.icon} />
        <p>
          Income: <span className={styles.green}>${income}</span>
        </p>
      </div>

      <div className={styles.card}>
        <FaShoppingCart className={styles.icon} />
        <p>
          Expense: <span className={styles.red}>${expense}</span>
        </p>
      </div>

      <div className={styles.card}>
        <FaBalanceScale className={styles.icon} />
        <p>
          Balance:{" "}
          <span className={balance >= 0 ? styles.green : styles.red}>
            ${balance}
          </span>
        </p>
      </div>
    </div>
  );
}
