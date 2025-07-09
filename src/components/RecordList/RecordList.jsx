// src/components/RecordList/RecordList.jsx
import React from "react";
import styles from "./RecordList.module.css";

export default function RecordList({ title, type, records, onEdit, onDelete }) {
  const filtered = records.filter((r) => r.type === type);

  const colorClass = type === "income" ? styles.green : styles.red;
  const prefix = type === "income" ? "+" : "-";

  return (
    <div className={styles.block}>
      <h3>{title}</h3>
      {filtered.length === 0 ? (
        <p className={styles.empty}>No {type} records</p>
      ) : (
        filtered.map((r, i) => (
          <div key={i} className={styles.record}>
            <div>
              <strong>{r.category}</strong> —{" "}
              <span className={colorClass}>
                {prefix}${r.amount}
              </span>
              <span className={styles.date}>{r.date}</span>
            </div>
            <div className={styles.actions}>
              <button onClick={() => onEdit(i)}>Edit</button>
              <button onClick={() => onDelete(i)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
