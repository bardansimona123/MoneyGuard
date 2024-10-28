// Sidebar.jsx
import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ onSectionChange }) => { // Modificare: adaugă onSectionChange ca prop
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li className={styles.menuItem} onClick={() => onSectionChange("Home")}> {/* Modificare: folosește onSectionChange */}
          <span className={styles.icon}>🏠</span>
          Home
        </li>
        <li className={styles.menuItem} onClick={() => onSectionChange("Statistics")}> {/* Modificare: folosește onSectionChange */}
          <span className={styles.icon}>📊</span>
          Statistics
        </li>
      </ul>
      <div className={styles.balance}>
        <p>Your Balance</p>
        <h2>₹ 24 000.00</h2>
      </div>
      <div className={styles.currencyTable}>
        <p>Currency</p>
        <div className={styles.currencyRow}>
          <span>USD</span>
          <span>27.55</span>
          <span>27.65</span>
        </div>
        <div className={styles.currencyRow}>
          <span>EUR</span>
          <span>30.00</span>
          <span>30.10</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
