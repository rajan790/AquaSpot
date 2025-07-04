import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { supabase } from '../../../Supabase/supabaseClient';
import styles from './Signup.module.css'
import emailIcon from "../../../assets/emailIcon.png";
import nameIcon from "../../../assets/nameIcon.png";
import lockIcon from "../../../assets/lockIcon.png";
export default function SignupWithOtpEmailjs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (<>
        <div className={styles.signupForm}>
            <form>
                <div className={styles.line}>
                    <img src={nameIcon} alt="" />
                    <input
                        placeholder='Enter Your Name'
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    /></div>
                <div className={styles.line}>
                    <img src={emailIcon} alt="" />
                    <input
                        placeholder='Enter Your Email'
                        name="name"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className={styles.line}>
                    <img src={lockIcon} alt="" />
                    <input
                        placeholder='Enter Your Password'
                        name="name"
                        type="password"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <button className={styles.signupBtn}>
                    Signup
                </button>
            </form>
        </div>
    </>)
}
