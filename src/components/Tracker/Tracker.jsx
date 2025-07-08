import React, { useState } from 'react';
import { useFormik } from 'formik';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Tracker.module.css';

const initialValues = {
  amount: '',
  category: '',
};

const incomeCategories = ['Salary', 'Bonus', 'Other'];
const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Other'];

export default function Tracker() {
  const [type, setType] = useState('income');
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      const newRecord = {
        ...values,
        type,
        date: new Date().toISOString().split('T')[0],
        amount: Number(values.amount),
      };

      if (editIndex !== null) {
        const updated = [...records];
        updated[editIndex] = newRecord;
        setRecords(updated);
        setEditIndex(null);
      } else {
        setRecords([newRecord, ...records]);
      }

      resetForm();
    },
  });

  const handleEdit = (index) => {
    const record = records[index];
    setType(record.type);
    formik.setValues({ amount: record.amount, category: record.category });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
  };

  const currentMonth = new Date().toISOString().slice(0, 7);
  const filtered = records.filter((r) => r.date.startsWith(currentMonth));
  const income = filtered.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const expense = filtered.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  const balance = income - expense;

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.container}>
        <h1 className={styles.heading}>Finance Tracker</h1>

        <div className={styles.toggle}>
          <button className={type === 'income' ? styles.active : ''} onClick={() => setType('income')}>Income</button>
          <button className={type === 'expense' ? styles.active : ''} onClick={() => setType('expense')}>Expense</button>
        </div>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option value="">Select Category</option>
            {(type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
        </form>

        <div className={styles.stats}>
          <div className={styles.card}>
            <p>Income: <span className={styles.green}>${income}</span></p>
          </div>
          <div className={styles.card}>
            <p>Expense: <span className={styles.red}>${expense}</span></p>
          </div>
          <div className={styles.card}>
            <p>Balance: <span className={balance >= 0 ? styles.green : styles.red}>${balance}</span></p>
          </div>
        </div>

        <div className={styles.list}>
          <h3>Records (this month)</h3>
          {filtered.length === 0 && <p className={styles.empty}>No records yet</p>}
          {filtered.map((r, i) => (
            <div key={i} className={styles.record}>
              <div>
                <strong>{r.category}</strong> — ${r.amount}
                <span className={styles.date}>{r.date}</span>
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
