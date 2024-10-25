import React from "react";
import styles from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ onClose }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>User Settings</h2>
        {/* Poți adăuga aici diferite setări pentru utilizator */}
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserSettingsModal;
