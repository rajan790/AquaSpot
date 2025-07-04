import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Navbar from "../../Components/users/Navbar/Navbar";
import searchIcon from "../../assets/searchIcon.png";
import plushIcon from "../../assets/plusIcon.png";
import {replace, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import LoadingComponent from "../../Components/Common/LoadingComponent";
const HomePage = () => {
 const navigate = useNavigate();
 const handleAddSpot = () =>
 {
  navigate("/addSpot" ,{ replace: true });
 }
  const { isLoggedIn, user, loading } = useAuth();
  const [animationDone, setAnimationDone] = useState(false);
   
  if (!animationDone) {
    return <LoadingComponent onComplete={() => setAnimationDone(true)} />;
  }
  return (
    <div className={styles.home}>
      <div className={styles["drop-container"]}>
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={styles["water-drop"]}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <Navbar />

      <div className={styles.afterNav}>
        <p className={styles.welcome}>Welcome back, Rajan! 👋</p>
        <p className={styles.subtext}>
          Find clean water spots near you or help others by adding new
          locations.
        </p>
        <div className={styles.boxContainer}>
          {/* Find Water Box */}
          <div className={styles.box1}>
            <div className={styles.imgText}>
              <img src={searchIcon} alt="search" />
              <p>Find Water Spots</p>
            </div>
            <input placeholder="Enter location or address" type="text" />
            <button className={`${styles.btn} ${styles.btn1}`}>
              Search Nearby
            </button>
          </div>

          {/* Add Water Spot */}
          <div className={styles.box2}>
            <div className={styles.imgText}>
              <img src={plushIcon} alt="add" />
              <p>Add New Spot</p>
            </div>
            <p className={styles.subboxtext}>
              Help the community by adding a new water source you've discovered.
            </p>
            <button className={`${styles.btn} ${styles.btn2}`} onClick={handleAddSpot}>
              Add Water Spot
            </button>
          </div>

          {/* Search Again Box */}
          <div className={styles.box3}>
            <div className={styles.imgText}>
              <p>📊 Your Impact</p>
            </div>
            <div className={styles.boxes}>
              <div className={styles.impactBox}>
                <p className={styles.impactHeading}>Spots Added</p>
                <p style={{fontSize:"35px", fontWeight:"bold", color:"#ffd700",marginTop:"20px"}}>18</p>
              </div>
              <div className={styles.impactBox}>
                <p className={styles.impactHeading}>Reviews Given</p>
                <p style={{fontSize:"35px", fontWeight:"bold", color:"#ffd700",marginTop:"20px"}}>32</p>
              </div>
              <div className={styles.impactBox}>
                <p className={styles.impactHeading}>Commpunity Rank</p>
                <p style={{fontSize:"35px", fontWeight:"bold", color:"#ffd700",marginTop:"20px"}}>#456</p>
              </div>
            </div>
          </div>
          <div className={styles.box4}>
            <div className={styles.upperSection}>
              <p style={{fontSize:"20px",fontWeight:"600",color:"white"}}>Nearby Water Spots</p>
              <p style={{fontSize:"20px",fontWeight:"600",color:"white",cursor:"pointer"}}>View All</p>
            </div>
              <div className={styles.nearbyBox}>
                <div className={styles.nearbyTop}>
                  <p className={styles.cityName}>City Name</p>
                  <p className={styles.status}>Status</p>
                </div>
                <div className={styles.nearbyBottom}>
                    <p style={{fontSize:"15px", fontWeight:"500", color:"white"}}>📍2.5 km</p>
                    <p  style={{fontSize:"15px", fontWeight:"500", color:"white"}}>⭐ 3.9</p>
                    <span style={{backgroundColor:"#D7E6FF",width:"fit-content",padding:"7px", color:"#3B82F6", borderRadius:"10px",fontSize:"15px"}}>Hand Pump</span>
                </div>
              </div>
              <div className={styles.nearbyBox}>
                <div className={styles.nearbyTop}>
                  <p className={styles.cityName}>City Name</p>
                  <p className={styles.status}>Status</p>
                </div>
                <div className={styles.nearbyBottom}>
                    <p style={{fontSize:"15px", fontWeight:"500", color:"white"}}>📍2.5 km</p>
                    <p  style={{fontSize:"15px", fontWeight:"500", color:"white"}}>⭐ 3.9</p>
                    <span style={{backgroundColor:"#D7E6FF",width:"fit-content",padding:"7px", color:"#3B82F6", borderRadius:"10px",fontSize:"15px"}}>Hand Pump</span>
                </div>
              </div>
              <div className={styles.nearbyBox}>
                <div className={styles.nearbyTop}>
                  <p className={styles.cityName}>City Name</p>
                  <p className={styles.status}>Status</p>
                </div>
                <div className={styles.nearbyBottom}>
                    <p style={{fontSize:"15px", fontWeight:"500", color:"white"}}>📍2.5 km</p>
                    <p  style={{fontSize:"15px", fontWeight:"500", color:"white"}}>⭐ 3.9</p>
                    <span style={{backgroundColor:"#D7E6FF",width:"fit-content",padding:"7px", color:"#3B82F6", borderRadius:"10px",fontSize:"15px"}}>Hand Pump</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
