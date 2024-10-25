import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSettingsModal from "./UserSettingsModal"; // Importăm modalul
import styles from "./Header.module.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };

  const handleUserNameClick = () => {
    setIsModalOpen(true); // Deschide modalul
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Închide modalul
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Money Guard</div>
      <div className={styles.userInfo}>
        <span className={styles.userName} onClick={handleUserNameClick}>
          Name
        </span>
        <button className={styles.exitButton} onClick={handleExit}>
          Exit
        </button>
      </div>

      {isModalOpen && <UserSettingsModal onClose={handleCloseModal} />}
    </header>
  );
};

export default Header;
