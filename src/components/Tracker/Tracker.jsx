import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Tracker.module.css';

const Tracker = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Їжа');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        'https://68646b9e5b5d8d03397d2d1d.mockapi.io/data'
      );
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = async () => {
    if (!amount || isNaN(amount)) return;

    const newExpense = {
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        'https://68646b9e5b5d8d03397d2d1d.mockapi.io/data',
        newExpense
      );
      setExpenses((prev) => [...prev, response.data]);
      setAmount('');
      setCategory('Їжа');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.formBlock}>
          <h2>Додати витрату</h2>
          <input
            type="number"
            placeholder="Сума"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Їжа</option>
            <option>Транспорт</option>
            <option>Розваги</option>
            <option>Інше</option>
          </select>
          <button onClick={handleAddExpense}>Додати</button>
        </div>

        <div className={styles.expensesBlock}>
          <h2>Витрати</h2>
          <div className={styles.expensesList}>
            {expenses.map((exp) => (
              <div key={exp.id} className={styles.expenseCard}>
                <p>💸 {exp.amount} грн</p>
                <p>📌 {exp.category}</p>
                <p>🕒 {new Date(exp.date).toLocaleString('uk-UA')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
