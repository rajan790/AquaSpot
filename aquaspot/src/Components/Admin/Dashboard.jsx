import React from 'react';
import styles from './Dashboard.module.css';
import location from '../../assets/location.png';
import tick from '../../assets/tick.png';
import pending from '../../assets/pending.png'
import cancel from '../../assets/cancel.png'
import water from '../../assets/water.png'
const Dashboard = () => {
  const reuse = ({ name, number, img, padding = "10px", bg = "#ffffff26" }) => {
    return (
      <div className={styles.firstContainer}>
        <div className={styles.firstInner}>
          <p style={{ color: "rgb(212, 212, 212)", fontWeight: "500" }}>{name}</p>
          <p style={{ fontSize: "35px" }}>{number}</p>
        </div>
        <img
          src={img}
          alt=""
          style={{
            padding: padding,
            backgroundColor: bg,
          }}
        />
      </div>
    );
  };

  return (
    <>
      {reuse({ name: "Total Spots", number: 0, img: location, bg: "rgba(255, 255, 255, 0.389)", padding: "10px" })}
      {reuse({ name: "Approved", number: 0, img: tick, bg: "#00ff0830", padding: "12px" })}
      {reuse({ name: "Pending", number: 0, img: pending, bg: "#f2f48269", padding: "10px" })}
      {reuse({ name: "Rejected", number: 0, img: cancel, bg: "#ff000050", padding: "11px" })}
      <div className={styles.recentOuter}>
        <h2>Recent Submission</h2>
        <div className={styles.list}>
          <img src={water} alt="" />
          <div className={styles.cityList}>
            <p style={{ fontWeight: "600" }}>Crystal Lake</p>
            <p style={{ color: "#ffffffa8" }}>Mountain View, CA</p>
          </div>
          <p  className={styles.request}>Approved</p>
        </div>
        <div className={styles.list}>
          <img src={water} alt="" />
          <div className={styles.cityList}>
            <p style={{ fontWeight: "600" }}>Crystal Lake</p>
            <p style={{ color: "#ffffffa8" }}>Mountain View, CA</p>
          </div>
          <p  className={styles.request}>Approved</p>
        </div>
        <div className={styles.list}>
          <img src={water} alt="" />
          <div className={styles.cityList}>
            <p style={{ fontWeight: "600" }}>Crystal Lake</p>
            <p style={{ color: "#ffffffa8" }}>Mountain View, CA</p>
          </div>
          <p className={styles.request}>Approved</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
