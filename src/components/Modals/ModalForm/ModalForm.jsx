import React from 'react';
import styles from './ModalForm.module.css';

export default function ModalForm({ isOpen, onClose, onSubmit, values, onChange, type, categories }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{type === 'income' ? 'Add Income' : 'Add Expense'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className={styles.form}
        >
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={values.amount}
            onChange={onChange}
            required
          />
          <select
            name="category"
            value={values.category}
            onChange={onChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className={styles.actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className={styles.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
