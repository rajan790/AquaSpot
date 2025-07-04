import React from 'react'
import styles from './SingleSpot.module.css'
const SingleSpot = () => {
  return (
    <div className={styles.fullPage}>
        <button className={styles.backBtn}>
            {"<-- Back to Spots"}
        </button>
        <div className={styles.spotContainer}>
            <div className={styles.spotHeading}>
                <h2>Clean Water Hub</h2>
                <p>📍123 main Street, Downtown Area, Punjab</p>
            </div>
            <div className={styles.spotDataContainer}>
                <div className={styles.imageContainer}>

                </div>
                <div className={styles.featureQuality}>
                    <div className={styles.featureContainer}>
                        <h4>🚰 Available Features</h4>
                        <div className={styles.features}>
                            <p>24/7 Access</p>
                            <p>24/7 Access</p>
                            <p>24/7 Access</p>
                            <p>24/7 Access</p>
                            <p>24/7 Access</p>
                            <p>24/7 Access</p>
                        </div>
                    </div>
                    <div className={styles.qualityContainer}>
                        <h4>🚰 Water Quality</h4>
                        <p className={styles.excellent}>⭐ Excellent</p>
                        <div className={styles.borderStyle}><p>Crystal clear, safe drinking water with excellent taste and purity standards</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleSpot