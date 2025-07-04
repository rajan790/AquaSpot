import React from 'react';
import styles from './Thanks.module.css'
import logo from '../../assets/logo.png'
import star from '../../assets/star.png'
import drop from '../../assets/drop.png'
import pin from '../../assets/pin.png'
import { replace, useNavigate } from 'react-router-dom';
const Thanks = () => {
const Call = ({ img, firstText, secondText, bgColor }) => {
  return (
    <div className={styles.iconText}>
      <div className={styles.iconBack} style={{ backgroundColor: bgColor }}>
        <img src={img} alt="icon" />
      </div>
      <p>{firstText}</p>
      <p style={{ color: "rgb(92, 92, 92)" }}>{secondText}</p>
    </div>
  );
};
const navigate = useNavigate();
const handleBack = () =>
{
  navigate('/')
}
  return (
    <>
      <div className={styles.page}>
        <div className={styles.animation}>
          <div className={styles.tick}>✔</div>
        </div>
        <div className={styles.container}>
          <div className={styles.ContentWidth}>
            <span style={{ fontWeight: "600", fontSize: "24px", textAlign: "center" }}>Thank You for Making a Difference! 💧</span>
            <p style={{ fontSize: "20px", textAlign: "center", lineHeight: "30px" }}>You've just helped thousands of people find clean water in your community. Your contribution will make someone's day easier when they're searching for a reliable water source. Together, we're building a network that ensures no one goes thirsty! 🙏</p>
            <Call img={star} firstText="Community Hero" secondText="You're helping build a better community" bgColor={"#2564eb48"}/>
            <Call img={drop} firstText="Water Access" secondText="Making clean water accessible to all" bgColor={"#A6FFC5"}/>
            <Call img={pin} firstText="Local Impact" secondText="Your spot will help countless locals" bgColor={"#E1C6FF"}/>
          </div>
        </div>
        <div className={styles.whatNextContainer}>
          <h2>What happens next?</h2>
          <div className={styles.lines}>
            <div className={styles.line}>
            <p style={{color: "#004ef8", background:"#2564eb48"}}>1</p>
            <span>Our team will verify your water spot location</span>
          </div>
          <div className={styles.line}>
            <p style={{color: "#16A34A", background:"#A6FFC5"}}>2</p>
            <span>Your spot will be added to our community map</span>
          </div>
          <div className={styles.line}>
            <p style={{color: "#9333EA", background:"#E1C6FF"}}>3</p>
            <span>People in need will find water thanks to you!</span>
          </div>
          </div>
        </div>
        <button className={styles.anotherSpotBtn}>Add Another Water Spot</button>
        <button className={styles.backBtn} onClick={handleBack}>Back to Home</button>
      </div>
    </>
  );
};

export default Thanks;
