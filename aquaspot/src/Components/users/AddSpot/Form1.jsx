import React, { useEffect, useState } from 'react';
import styles from './Form1.module.css';
import waterTab from "../../../assets/waterTab.png";
import handpump from "../../../assets/handpump.png";
import waterCooler from "../../../assets/waterCooler.png";
import { useNavigate } from 'react-router-dom';
import { useAddSpotStore } from '../../../store/addSpotStore'; // adjust path if needed

const Form1 = ({ setCurrent }) => {
  
  const store = useAddSpotStore(); // ✅ Access global store
  const navigate = useNavigate();


  const [form, setForm] = useState({ ...store.form1 });
  const [select, setSelect] = useState(form.source || 'none');
  const [isValid, setIsValid] = useState(false);

  const sources = [
    { id: "b1", img: waterTab, label: "Public Tap" },
    { id: "b2", img: handpump, label: "Hand Pump" },
    { id: "b3", img: waterCooler, label: "Water Cooler" }
  ];


  // Validation function
  const nextCheck = () => {
    return (
      select !== 'none' &&
      form.name.trim() !== '' &&
      form.address.trim() !== ''
    );
  };

  useEffect(() => {
    setIsValid(nextCheck());
  }, [form, select]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!nextCheck()) return;
    store.form1 = {
      ...form,
      source: select
    };
    setCurrent('form2');
  };

  const handleBack = () => {
    navigate('/', { replace: true })
    store.form1.name=""
    store.form1.address=""
    store.form1.description=""
    store.form1.source=""
    store.form2.coordinates=""
    store.form2.features=""
  };

  const labelStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginTop: "30px"
  };

  return (
    <>
      <p style={{ ...labelStyle, marginTop: "20px" }}>
        Water Spot Name <span style={{ color: 'red' }}>*</span>
      </p>
      
      <input
        name="name"
        value={form.name}
        onChange={handleInput}
        placeholder='e.g. Central Park Fountain, Mall Water Station'
        type="text"
        required
      />

      <p style={labelStyle}>
        Type of Water Source <span style={{ color: 'red' }}>*</span>
      </p>
      <div className={styles.boxContainer}>
        {sources.map(source => (
          <div
            key={source.label}
            className={`${styles.box} ${select === source.label ? styles.select : ''}`}
            onClick={() => setSelect(source.label)}
          >
            <img src={source.img} alt={source.label} />
            <p>{source.label}</p>
          </div>
        ))}
      </div>

      <p style={labelStyle}>
        Address <span style={{ color: 'red' }}>*</span>
      </p>
      <input
        name="address"
        value={form.address}
        onChange={handleInput}
        placeholder='Enter the full address'
        type="text"
        required
      />
      <p style={labelStyle}>Description</p>
      <textarea
        name="description"
        value={form.description}
        onChange={handleInput}
        placeholder='Describe the water spot, its location, and any special features...'
      />

      <hr style={{ border: "none", border: "1px solid #dcdcdc", marginTop: "30px" }} />

      <div className={styles.buttons}>
        <button className={styles.btn1} onClick={handleBack}>Back</button>
        <button
          className={isValid ? styles.active : styles.btn2}
          onClick={handleNext}
          title='All * fields must be filled'
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Form1;
