import React from 'react'
import styles from './Navbar.module.css'
import logo from '../../../assets/logo.png'
import {Users} from 'lucide-react';
import { useAuth } from '../../../store/Auth'
const Navbar = () => {
  const {logout} = useAuth();
  return (
    <div className={styles.navbar}>
        <div className={styles.logoContainer}>
            <img src={logo} alt="" />
            <p>AquaSpot</p>
        </div>
        <div className={styles.userIconWrapper}>
  <Users className={styles.userIcon} onClick={()=>{logout()}} />
</div>
    </div>
  )
}

export default Navbar