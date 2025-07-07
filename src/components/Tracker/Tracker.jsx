import React, { useState } from 'react';
import styles from './Tracker.module.css';
import { v4 as uuidv4 } from 'uuid';

const categories = {
  income: ['Зарплата', 'Бонуси', 'Інше'],
  expense: ['Їжа', 'Транспорт', 'Розваги', 'Інше'],
};

const TrackerPage = () => {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!amount || !category) return;

    const newRecord = {
      id: editId || uuidv4(),
      type,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleString(),
    };

    if (editId) {
      setRecords((prev) =>
        prev.map((r) => (r.id === editId ? newRecord : r))
      );
      setEditId(null);
    } else {
      setRecords((prev) => [...prev, newRecord]);
    }

    setAmount('');
    setCategory('');
  };

  const handleEdit = (id) => {
    const record = records.find((r) => r.id === id);
    setAmount(record.amount);
    setCategory(record.category);
    setType(record.type);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className={styles.right}>
      <div className={styles.form}>
        <h2>Фінансовий Трекер</h2>

        <div className={styles.toggle}>
          <button
            className={`${type === 'income' ? styles.active : ''} ${styles.submitBtn}`}
            onClick={() => setType('income')}
          >
            Доходи
          </button>
          <button
            className={`${type === 'expense' ? styles.active : ''} ${styles.submitBtn}`}
            onClick={() => setType('expense')}
          >
            Витрати
          </button>
        </div>

        <input
          className={styles.input}
          type="number"
          placeholder="Сума"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Оберіть категорію</option>
          {categories[type].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button className={styles.submitBtn} onClick={handleAddOrUpdate}>
          {editId ? 'Оновити запис' : 'Додати запис'}
        </button>

        <ul className={styles.list}>
          {records.map((record) => (
            <li key={record.id} className={styles.record}>
              <div>
                <strong>{record.type === 'income' ? '+' : '-'}</strong> {record.amount} грн — {record.category}
              </div>
              <div className={styles.meta}>{record.date}</div>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(record.id)}>✏️</button>
                <button onClick={() => handleDelete(record.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackerPage;
