import React, { useState } from "react";
import Header from "./Header/Header";
import Sidebar from "./SideBar/Sidebar";
import MainContent from "./Main/MainContent";
import Statistics from "./Main/Statistics"; // Importă componenta Statistics
import Footer from "./Footer/Footer";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeSection, setActiveSection] = useState("Home"); // Starea pentru secțiunea activă

  const addEntry = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section); // Schimbă secțiunea activă
  };

  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.body}>
        <Sidebar onSectionChange={handleSectionChange} /> {/* Transmite funcția */}
        {activeSection === "Home" ? (
          <MainContent data={transactions} addEntry={addEntry} /> // Afișează MainContent
        ) : (
          <Statistics transactions={transactions} /> // Transmite tranzacțiile către Statistics
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
