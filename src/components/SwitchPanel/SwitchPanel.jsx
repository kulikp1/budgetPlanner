import React from "react";
import styles from "./SwitchPanel.module.css";

export default function SwitchPanel({ switchType, setSwitchType, onAdd }) {
  const switchLabel =
    switchType === "income"
      ? "Track your monthly income by adding salary, bonuses, or other sources."
      : "Record your expenses to keep your finances under control.";

  const toggleType = () => {
    setSwitchType((prev) => (prev === "income" ? "expense" : "income"));
  };

  return (
    <div className={styles.chartPlaceholder}>
      <div className={styles.switchBlock}>
        <div className={styles.switchTop}>
          <span
            className={
              switchType === "income"
                ? styles.activeType
                : styles.inactiveType
            }
          >
            Income
          </span>

          <div className={styles.switchContainer} onClick={toggleType}>
            <div
              className={`${styles.switchSlider} ${
                switchType === "expense" ? styles.expense : ""
              }`}
            ></div>
          </div>

          <span
            className={
              switchType === "expense"
                ? styles.activeType
                : styles.inactiveType
            }
          >
            Expense
          </span>
        </div>

        <p key={switchType} className={`${styles.switchText} ${styles.fade}`}>
          {switchLabel}
        </p>

        <button
          className={styles.flatAddButton}
          onClick={() => onAdd(switchType)}
        >
          {switchType === "income" ? "Add Income" : "Add Expense"}
        </button>
      </div>
    </div>
  );
}
