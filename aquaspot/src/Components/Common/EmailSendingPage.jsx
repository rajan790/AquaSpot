// EmailSendingPage.jsx
import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import styles from './EmailSendingPage.module.css';
import { useAuth } from '../../store/Auth';
import { useNavigate } from 'react-router-dom';

const EmailSendingPage = ({ setPage }) => {
  const [progress, setProgress] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const { signupData } = useAuth();

  // ✅ Redirect to signup if OTP is missing (e.g. on refresh)
  useEffect(() => {
    if (!signupData.otp || signupData.otp === "") {
      navigate("/signup", { replace: true });
    }
  }, [signupData.otp, navigate]);

  // ✅ Warn on refresh or close
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

  // ✅ Animate progress and then go to OTP input
  useEffect(() => {
    const startTimer = setTimeout(() => {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsRedirecting(true);

            setTimeout(() => {
              setPage("otp");
            }, 600);

            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }, 1000);

    return () => clearTimeout(startTimer);
  }, [setPage]);

  return (
    <div className={styles.fullPage}>
      <div className={`${styles.form} ${isRedirecting ? styles.slideOut : ''}`}>
        <div className={styles.logoContainer}>
          <img className={styles.logoImg} src={logo} alt="logo" />
        </div>
        <p className={styles.appName}>AquaSpot</p>
        <p className={styles.line1}>Verification Code Sent!</p>
        <p className={styles.line2}>
          We've sent a 6-digit verification code to <b>{signupData.email}</b>. Please check your inbox and enter the code to verify your account.
        </p>

        <div className={styles.progressContainer}>
          <p className={styles.progressLabel}>Redirecting...</p>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSendingPage;
