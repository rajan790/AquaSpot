import React from 'react';
import styles from './AddSpotPage.module.css';
import Navbar from '../../Components/users/Navbar/Navbar';
import ToggleAddSpot from '../../Components/users/AddSpot/ToggleAddSpot';
import { SpotStoreProvider } from '../../store/addSpotStore';
const AddSpotPage = () => {
  return (
    <>
    
      <div className={styles.addSpotPage}>
        <Navbar />
        
        <div className={styles.afterNav}>
          <p className={styles.head1}>Add New Water Spot 💧</p>
          <p className={styles.head2}>
            Help the community by sharing a clean water source you've discovered.
          </p>
          <SpotStoreProvider>
          <ToggleAddSpot />
          </SpotStoreProvider>
        </div>
      </div>
    </>
  );
};

export default AddSpotPage;
