// components/Dashboard/Statistics.jsx
import React from "react";
import styles from "./Statistics.module.css";

const Statistics = () => {
  return (
    <section className={styles.statistics}>
      <h2>Statistics</h2>
      <div className={styles.chartContainer}>
        <div className={styles.circularChart}>
          {/* Inserați diagrama circulară aici */}
          <p>₹ 24,000.00</p>
        </div>
        <div className={styles.expenseList}>
          <div className={styles.expenseItem}>
            <span style={{ backgroundColor: "#4CAF50" }}></span>
            <p>Car</p>
            <p>1,500.00</p>
          </div>
          {/* Repetați pentru fiecare categorie de cheltuieli */}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
