import React, { useState } from 'react'
import styles from './Admin.module.css'
import Navbar from '../../Components/users/Navbar/Navbar'
import Dashboard from '../../Components/Admin/Dashboard';
import ManageSpot from '../../Components/Admin/ManageSpot';
import AddSpot from '../../components/Admin/AddSpot';
const Admin = () => {
  const [toggle, setToggle] = useState("Dashboard");
  const renderPage = () => {
    switch (toggle) {
      case 'Dashboard':
        return <Dashboard />
      case 'ManageSpot':
        return <ManageSpot />
      case 'AddSpot':
        return <AddSpot />
      default:
        return null;
    }
  }
  return (
    <>
      <div>
        <Navbar />
        <div className={styles.afterNav}>
          <div className={styles.toggleContainer}>
            <div
              className={`${styles.toggle1} ${toggle === "Dashboard" ? styles.active : ''}`}
              onClick={() => setToggle("Dashboard")}
            >
              Dashboard
            </div>

            <div
              className={`${styles.toggle2} ${toggle === "ManageSpot" ? styles.active : ''}`}
              onClick={() => setToggle("ManageSpot")}
            >
              Manage Spots
            </div>

            <div
              className={`${styles.toggle3} ${toggle === "AddSpot" ? styles.active : ''}`}
              onClick={() => setToggle("AddSpot")}
            >
              Add New Spot
            </div>

          </div>
          <div className={styles.pages}>
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin