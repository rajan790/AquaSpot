// Form3.jsx
import React, { useState } from 'react';
import styles from './Form3.module.css';
import { useAddSpotStore } from '../../../store/addSpotStore';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../Supabase/supabaseClient';

const Form3 = ({ setCurrent }) => {
  const store = useAddSpotStore();
  const navigate = useNavigate();
  const [workingHours, setWorkingHours] = useState('24/7');
  const [waterQuality, setWaterQuality] = useState('excellent');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => e.preventDefault();
const handleNext = () => {
  store.form3.timing = workingHours;
  store.form3.waterQuality = waterQuality;
  store.uploadSpotData(files, navigate);
};

  const handlePrev = () => setCurrent('form2');

  const renderCustomTime = () =>
    workingHours === 'custom' ? (
      <div className={styles.timeInputs}>
        <div>
          <label htmlFor="from" className={styles.label}>From</label>
          <input type="time" id="from" className={styles.timeBox} />
        </div>
        <div>
          <label htmlFor="to" className={styles.label}>To</label>
          <input type="time" id="to" className={styles.timeBox} />
        </div>
      </div>
    ) : null;

  return (
    <>
      <p className={styles.title}>Timing <span className={styles.required}>*</span></p>
      <div className={styles.dropdownContainer}>
        <select
          id="workingHours"
          className={styles.selectBox}
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
        >
          <option value="24/7">24/7</option>
          <option value="9to5">9 AM - 5 PM</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {renderCustomTime()}

      <p className={styles.title}>Water Quality <span className={styles.required}>*</span></p>
      <div className={styles.dropdownContainer}>
        <select
          id="waterQuality"
          className={styles.selectBox}
          value={waterQuality}
          onChange={(e) => setWaterQuality(e.target.value)}
        >
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
          <option value="veryPoor">Very Poor</option>
        </select>
      </div>

      <p className={styles.title}>Photos (Optional)</p>
      <div
        className={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className={styles.dropContent}>
          <img src="/camera-icon.svg" alt="camera" className={styles.cameraIcon} />
          <p>Add photos of the water spot</p>
          <label htmlFor="fileUpload" className={styles.fileLabel}>Choose Files</label>
          <input
            type="file"
            id="fileUpload"
            multiple
            className={styles.hiddenInput}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className={styles.previewGrid}>
          {files.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className={styles.previewImage}
            />
          ))}
        </div>
      )}

      <hr style={{ border: 'none', border: '1px solid #dcdcdc', marginTop: '30px' }} />
      <div className={styles.buttons}>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
};

export default Form3;
