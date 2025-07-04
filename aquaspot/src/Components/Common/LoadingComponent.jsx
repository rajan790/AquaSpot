import React, { useState, useEffect } from 'react';
import styles from './loading.module.css';

const LoadingComponent = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    "Authenticating user...",
    "Loading water spots...",
    "Preparing dashboard...",
    "Almost ready!"
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          onComplete?.(); 
          return 100;
        }
        return prev + 2;
      });
    }, 90);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [onComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundBubbles}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.bubble}
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className={styles.floatingDrops}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={styles.drop}
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          >
            <div className={styles.dropShape}>
              <div className={styles.dropTop}></div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.loadingCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}>
            <div className={styles.logoInner}>
              <div className={styles.logoIcon}>
                <div className={styles.logoHighlight}></div>
              </div>
            </div>
          </div>
          <h1 className={styles.title}>AquaSpot</h1>
          <p className={styles.subtitle}>Loading your clean water dashboard</p>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}>
              <div className={styles.progressShine}></div>
            </div>
          </div>
          <div className={styles.progressText}>{progress}%</div>
        </div>

        <div className={styles.stepsContainer}>
          {loadingSteps.map((step, index) => (
            <div
              key={index}
              className={`${styles.step} ${
                index <= currentStep ? styles.stepActive : styles.stepInactive
              }`}
            >
              <div
                className={`${styles.stepIcon} ${
                  index < currentStep
                    ? styles.stepIconCompleted
                    : index === currentStep
                    ? styles.stepIconCurrent
                    : styles.stepIconPending
                }`}
              >
                {index < currentStep && <div className={styles.stepIconDot}></div>}
              </div>
              <span
                className={`${styles.stepText} ${
                  index <= currentStep ? styles.stepTextActive : styles.stepTextInactive
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.dotsContainer}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.dot} style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>

      <div className={styles.rippleContainer}>
        <div className={`${styles.ripple} ${styles.ripple1}`}></div>
        <div className={`${styles.ripple} ${styles.ripple2}`}></div>
        <div className={`${styles.ripple} ${styles.ripple3}`}></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
