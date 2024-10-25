import React from "react";
import styles from "./MainContent.module.css";

const MainContent = () => {
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
          {/* Example row */}
          <tr>
            <td>04.01.23</td>
            <td>-</td>
            <td>Other</td>
            <td>Gift for your wife</td>
            <td>300.00</td>
            <td>
              <button className={styles.editButton}>✏️</button>
              <button className={styles.deleteButton}>Delete</button>
            </td>
          </tr>
          {/* Add more rows as necessary */}
        </tbody>
      </table>
      <button className={styles.addButton}>+</button>
    </div>
  );
};

export default MainContent;
