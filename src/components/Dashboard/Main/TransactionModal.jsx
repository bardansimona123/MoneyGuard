import React, { useState } from "react";
import styles from "./TransactionModal.module.css";

const TransactionModal = ({ onClose, onAddTransaction }) => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["Car", "Makeup", "Groceries", "Utilities", "Entertainment"];

  const handleAdd = () => {
    // Verificarea dacă amount și date sunt introduse corect
    if (amount && date) {
      const newTransaction = {
        type,
        amount: parseFloat(amount),
        date,
        comment,
        category: type === "expense" ? category : null,
      };
      onAddTransaction(newTransaction); // Apelarea funcției onAddTransaction pentru a adăuga tranzacția
      // Resetarea câmpurilor după adăugarea tranzacției
      setAmount("");
      setDate("");
      setComment("");
      setCategory("");
      setType("income"); // Resetăm tipul la income
      onClose();
    } else {
      alert("Please fill in all required fields."); // Afișăm un mesaj de eroare dacă câmpurile nu sunt completate
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add transaction</h2>
        <div className={styles.typeSelector}>
          <button
            className={type === "income" ? styles.active : ""}
            onClick={() => setType("income")}
          >
            Income
          </button>
          <button
            className={type === "expense" ? styles.active : ""}
            onClick={() => setType("expense")}
          >
            Expense
          </button>
        </div>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {type === "expense" && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className={styles.addButton} onClick={handleAdd}>Add</button>
        <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TransactionModal;
