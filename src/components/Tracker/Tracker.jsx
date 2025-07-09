import React, { useState } from 'react';
import { useFormik } from 'formik';
import Sidebar from '../Sidebar/Sidebar';
import ModalForm from '../Modals/ModalForm/ModalForm';
import styles from './Tracker.module.css';
import { FaMoneyBillWave, FaShoppingCart, FaBalanceScale, FaPlus } from 'react-icons/fa';

const incomeCategories = ['Salary', 'Bonus', 'Other'];
const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Other'];

export default function Tracker() {
  const [type, setType] = useState('income');
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: { amount: '', category: '' },
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
      setIsModalOpen(false);
    },
  });

  const handleEdit = (index) => {
    const record = records[index];
    setType(record.type);
    formik.setValues({ amount: record.amount, category: record.category });
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
  };

  const openModalWithType = (modalType) => {
    setType(modalType);
    formik.resetForm();
    setEditIndex(null);
    setIsModalOpen(true);
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

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => {
            formik.resetForm();
            setEditIndex(null);
            setIsModalOpen(false);
          }}
          onSubmit={formik.handleSubmit}
          values={formik.values}
          onChange={formik.handleChange}
          type={type}
          categories={type === 'income' ? incomeCategories : expenseCategories}
        />

        <div className={styles.stats}>
          <div className={styles.card}>
            <button
              className={styles.addButton}
              onClick={() => openModalWithType('income')}
              title="Add Income"
              aria-label="Add Income"
            >
              <FaPlus />
            </button>
            <FaMoneyBillWave className={styles.icon} />
            <p>Income: <span className={styles.green}>${income}</span></p>
          </div>

          <div className={styles.card}>
            <button
              className={styles.addButton}
              onClick={() => openModalWithType('expense')}
              title="Add Expense"
              aria-label="Add Expense"
            >
              <FaPlus />
            </button>
            <FaShoppingCart className={styles.icon} />
            <p>Expense: <span className={styles.red}>${expense}</span></p>
          </div>

          <div className={styles.card}>
            <FaBalanceScale className={styles.icon} />
            <p>Balance: <span className={balance >= 0 ? styles.green : styles.red}>${balance}</span></p>
          </div>
        </div>
<div className={styles.sidePanel}>
  <div className={styles.dualList}>
    {/* Income Block */}
    <div className={styles.block}>
      <h3>Your Income</h3>
      {income === 0 ? (
        <p className={styles.empty}>No income records</p>
      ) : (
        filtered
          .filter((r) => r.type === 'income')
          .map((r, i) => (
            <div key={i} className={styles.record}>
              <div>
                <strong>{r.category}</strong> — <span className={styles.green}>+${r.amount}</span>
                <span className={styles.date}>{r.date}</span>
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </div>
            </div>
          ))
      )}
    </div>

    {/* Expense Block */}
    <div className={styles.block}>
      <h3>Your Expenses</h3>
      {expense === 0 ? (
        <p className={styles.empty}>No expense records</p>
      ) : (
        filtered
          .filter((r) => r.type === 'expense')
          .map((r, i) => (
            <div key={i} className={styles.record}>
              <div>
                <strong>{r.category}</strong> — <span className={styles.red}>-${r.amount}</span>
                <span className={styles.date}>{r.date}</span>
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </div>
            </div>
          ))
      )}
    </div>
  </div>
</div>

        


      </main>
    </div>
  );
}
