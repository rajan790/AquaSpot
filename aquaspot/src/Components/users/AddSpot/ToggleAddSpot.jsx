import React, { useEffect, useRef, useState } from 'react';
import styles from './ToggleAddSpot.module.css';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import { LoadScript } from '@react-google-maps/api';
const usePageRefreshListener = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Optional: Show confirmation dialog (not supported in all browsers)
      event.preventDefault();
      event.returnValue = '';
      console.log("Page is being refreshed or closed.");
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};
const ToggleAddSpot = () => {

  const [current, setCurrent] = useState("form1");
  {usePageRefreshListener()}
  const renderForm = () => {
    switch (current) {
      case 'form1':
        return <Form1 setCurrent={setCurrent} />;
      case 'form2':
        return <Form2 setCurrent={setCurrent} />;
      case 'form3':
        return <Form3 setCurrent={setCurrent} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.toggleContainer}>
        <div className={`${styles.toggle} ${current === 'form1' ? styles.active : ''}`}>
          <p>1</p><span>Basic Info</span>
        </div>
        <div className={`${styles.toggle} ${current === 'form2' ? styles.active : ''}`}>
          <p>2</p><span>Details & Features</span>
        </div>
        <div className={`${styles.toggle} ${current === 'form3' ? styles.active : ''}`}>
          <p>3</p><span>Photos & Review</span>
        </div>
      </div>
      <div className={styles.form}>
        {renderForm()}
      </div>
    </>
  );
};

export default ToggleAddSpot;
