import styles from './SignupPage.module.css'
import logo from "../../assets/logo.png";
import Bubble from "../../Components/users/Bubble/Bubble";
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../store/Auth'
import { useEffect, useState } from 'react';
const SignupPage = () => {
  const navigate = useNavigate();
  const {EmailSend,storeSignupData} = useAuth();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  const handleCreate = async () =>
  {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const res = await EmailSend(email,otp);
    if (res.success) {
      storeSignupData(name, email,otp,password);
      navigate('/verification')
    } else {
      alert("not valid retry")
      setEmail("");
      setPassword("");
      setName("");
    }

  }
  return (
    <>
      <div className={styles.signupPage}>
        <div className={styles.bubbleZone}>

          <Bubble move={"move1"} size={"90px"} top={"50px"} left={"-200px"} />
          <Bubble move={"move3"} size={"110px"} top={"70%"} left={"-100px"} />
          <Bubble move={"move2"} size={"90px"} top={"30%"} left={"475px"} />

          <div className={styles.signupForm}>
            <img className={styles.logoImg} src={logo} alt="" />
            <p className={styles.logoName}>AquaSpot</p>
            <p className={styles.formline1}>
              Access clean water information in your area
            </p>
            <div className={styles.inputField}>
              <p>👤</p>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter Your Name" type="text" />
            </div>
            <div className={styles.inputField}>
              <p>✉️</p>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Your Email" type="email" />
            </div>
            <div className={styles.inputField}>
              <p>🔒</p>
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Your Password" type="password" />
            </div>
            <button className={styles.shinyButton}onClick={handleCreate}>Create Account</button>
            <p className={styles.loginLine}>Already have an account? <span onClick={() => { navigate('/') }}>Login</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage