import React, { useState, useEffect } from 'react';
import styles from './Form2.module.css';
import MyMap from '..//Map/MyMap';
import { useAddSpotStore } from '../../../store/addSpotStore';

const Form2 = ({ setCurrent }) => {
  const store = useAddSpotStore();
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    if (store.form2.features.length > 0) {
      setSelectedFeatures(store.form2.features);
    }
  }, [store.form2.features]);

  const handleNext = () => {
    store.form2.features = selectedFeatures;
    setCurrent('form3');
  };

  const handlePrev = () => setCurrent('form1');

  const handleMapSelect = (coords) => {
    store.form2.coordinates = coords;
  };

  const features = [
    'Wheelchair Accessible',
    '24/7 Available',
    'Filtered Water',
    'Multiple Taps',
    'Bottle Filling Station',
    'Indoor Location',
    'Cold Water',
    'Nearby Parking',
    'Cleanliness Maintained',
    'Mobile Charger Port',
    'Sensor Tap',
    'Child Friendly'
  ];

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <>
      <p style={{ fontSize: "18px", fontWeight: "600", marginTop: "20px", marginBottom: "20px" }}>
        Precise Location <span style={{ color: 'red' }}>*</span>
      </p>
      <MyMap onLocationSelect={handleMapSelect} />

      <p style={{ fontSize: "18px", fontWeight: "600", marginTop: "20px" }}>
        Select Available Features -
      </p>
      <div className={styles.boxes}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${styles.box} ${selectedFeatures.includes(feature) ? styles.active : ''}`}
            onClick={() => toggleFeature(feature)}
          >
            {feature}
          </div>
        ))}
      </div>
      <hr style={{ border: "none", border: "1px solid #dcdcdc", marginTop: "30px" }} />
      <div className={styles.buttons}>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
};

export default Form2;
