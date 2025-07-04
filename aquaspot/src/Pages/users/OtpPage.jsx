import React, { useEffect, useRef, useState } from 'react';
import styles from './OtpPage.module.css';
import logo from '../../assets/logo.png';
import { useAuth } from '../../store/Auth';
import { useNavigate } from 'react-router-dom';
import EmailSendingPage from '../../Components/Common/EmailSendingPage'
const OtpPage = () => {
  const [page, setPage] = useState("animation");
  const [time, setTime] = useState(10);
  const { signupData, completeSignup } = useAuth();
  const navigate = useNavigate();
  const otp = signupData.otp;

  useEffect(() => {
    let timer;
    if (page === "verify" && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [page, time]);

  const VerifyPage = () => {
    const inputsRef = useRef([]);
    const [enteredOtp, setEnteredOtp] = useState("");

    const handleChange = (e, index) => {
      const value = e.target.value;
      if (!/^[0-9]$/.test(value)) {
        e.target.value = "";
        e.target.classList.remove(styles.active);
        return;
      }

      if (value) {
        e.target.classList.add(styles.active);
      }

      const otpArray = inputsRef.current.map((input) => input.value || "");
      setEnteredOtp(otpArray.join(""));

      if (index < inputsRef.current.length - 1 && value) {
        inputsRef.current[index + 1].focus();
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        if (!e.target.value) {
          e.target.classList.remove(styles.active);
        }
        if (!e.target.value && index > 0) {
          inputsRef.current[index - 1].focus();
        }
      }
    };

    const handleVerify = async () => {
      if (enteredOtp === otp) {
        const result = await completeSignup();
        if (result.success) {
          alert("Signup complete!");
          navigate("/"); // or /login
        } else {
          alert("Signup failed. Try again.");
        }
      } else {
        alert("Wrong OTP");
      }
    };
useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'If you leave, you’ll lose your verification progress.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
    return (
      <div className={styles.fullPage}>
        <div className={styles.otpForm}>
          <img className={styles.logoImg} src={logo} alt="logo" />
          <p className={styles.appName}>AquaSpot</p>
          <p className={styles.verifyLine}>Verify Your Account</p>
          <div className={styles.outerOtp}>
            <p className={styles.otpLine}>OTP sent to: {signupData.email}</p>
          </div>
          <div className={styles.otpContainer}>
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                pattern="[0-9]"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className={styles.otpInput}
              />
            ))}
          </div>
          <button className={styles.verifyBtn} onClick={handleVerify}>
            Verify OTP
          </button>
          <p className={`${time <= 0 ? styles.none : ""}`}>
            Resend available in {time}s
          </p>
          <p>
            Didn't receive the code? <span className={styles.resend}>Resend OTP</span>
          </p>
          <p className={styles.debugOtp}>Real OTP: {otp}</p>
        </div>
      </div>
    );
  };

  return (
    <>
    
      {page === "animation" ? <EmailSendingPage setPage={setPage} /> : <VerifyPage />}
    </>
  );
};

export default OtpPage;
