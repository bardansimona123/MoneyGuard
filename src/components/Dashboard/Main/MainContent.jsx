import React, { useState } from "react";
import TransactionModal from "./TransactionModal";
import styles from "./MainContent.module.css";

const MainContent = ({ data = [], addEntry }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransaction = (newTransaction) => {
    // 1. Apelăm funcția addEntry primită ca prop pentru a adăuga noua tranzacție
    addEntry(newTransaction);
  };

  return (
    <div className={styles.mainContent}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.type === "income" ? "+" : "-"}</td>
                <td>{item.category || "-"}</td>
                <td>{item.comment}</td>
                <td>{item.amount.toFixed(2)}</td>
                <td>
                  <button className={styles.editButton}>✏️</button>
                  <button className={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className={styles.noDataMessage}>
                No transactions available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>+</button>
      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
          onAddTransaction={handleAddTransaction} // 2. Transmiterea funcției handleAddTransaction ca prop
        />
      )}
    </div>
  );
};

export default MainContent;
