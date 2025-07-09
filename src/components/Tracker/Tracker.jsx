import React, { useState } from "react";
import { useFormik } from "formik";
import Sidebar from "../Sidebar/Sidebar";
import ModalForm from "../Modals/ModalForm/ModalForm";
import SwitchPanel from "../SwitchPanel/SwitchPanel";
import styles from "./Tracker.module.css";
import Header from "../Header/Header";
import StatsPanel from "../StatsPanel/StatsPanel";
import RecordList from "../RecordList/RecordList";

const incomeCategories = ["Salary", "Bonus", "Other"];
const expenseCategories = ["Food", "Transport", "Entertainment", "Other"];

export default function Tracker() {
  const [type, setType] = useState("income");
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchType, setSwitchType] = useState("income");

  const formik = useFormik({
    initialValues: { amount: "", category: "" },
    onSubmit: (values, { resetForm }) => {
      const newRecord = {
        ...values,
        type,
        date: new Date().toISOString().split("T")[0],
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
  const income = filtered
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);
  const expense = filtered
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);
  const balance = income - expense;

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.container}>
        <Header />

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
          categories={type === "income" ? incomeCategories : expenseCategories}
        />

        <StatsPanel income={income} expense={expense} balance={balance} />
        <SwitchPanel
          switchType={switchType}
          setSwitchType={setSwitchType}
          onAdd={openModalWithType}
        />

        <div className={styles.sidePanel}>
          <div className={styles.dualList}>
            <RecordList
              title="Your Income"
              type="income"
              records={filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <RecordList
              title="Your Expenses"
              type="expense"
              records={filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
