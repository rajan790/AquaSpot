import React, { useEffect, useState } from 'react';
import styles from './ManageSpot.module.css';
import infoIcon from '../../assets/infoIcon.png';
import { supabase } from '../../Supabase/supabaseClient';

const ManageSpot = () => {
  const [spotRequests, setSpotRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('spotsData')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('❌ Error fetching spot data:', error.message);
      } else {
        setSpotRequests(data);
      }

      setLoading(false);
    };

    fetchSpots();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <>
        <div className={styles.loadingContainer}>
          </div>
        <div className={styles.loadingContainer}>
          </div>
        <div className={styles.loadingContainer}>
          </div>
        <div className={styles.loadingContainer}>
          </div>
          </>
      ) : spotRequests.length === 0 ? (
        <p>No spot requests found.</p>
      ) : (
        spotRequests.map((list, idx) => (
          <div className={styles.outerContainer} key={idx}>
            <div className={styles.animationContainer}>
              <img title="All Details" src={infoIcon} className={styles.infoIcon} />
              <div className={styles.circle1}>
                <div className={styles.circle2}></div>
              </div>
            </div>
            <p className={styles.spotName}>⛲ {list.name || list.spotName || 'Unnamed Spot'}</p>
            <p className={styles.dataLine}>📌 {list.address || 'No address'}</p>
            <p className={styles.dataLine}>👤 {list.username || list.useremail || 'Unknown user'}</p>
            <p className={styles.dataLine}>📅 {list.date}</p>
            <p className={styles.dataLine}>🕒 {list.time}</p>
            <div className={styles.btnContainer}>
              <button className={styles.approveBtn}>Approve</button>
              <button className={styles.rejectBtn}>Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageSpot;
