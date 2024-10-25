import React from "react";
import Header from "./Header/Header";
import Sidebar from "./SideBar/Sidebar";
import MainContent from "./Main/MainContent";
import Footer from "./Footer/Footer";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
