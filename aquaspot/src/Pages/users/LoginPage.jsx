import { useState } from "react";
import styles from "./LoginPage.module.css";
import logo from "../../assets/logo.png";
import Bubble from "../../Components/users/Bubble/Bubble";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ fix: call the hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate("/"); // ✅ redirect to home/dashboard
    } else {
      alert("Login failed: " + result.error.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.bubbleZone}>
        <Bubble move={"move1"} size={"90px"} top={"50px"} left={"-200px"} />
        <Bubble move={"move3"} size={"110px"} top={"70%"} left={"-100px"} />
        <Bubble move={"move2"} size={"90px"} top={"30%"} left={"475px"} />

        <div className={styles.loginForm}>
          <img className={styles.logoImg} src={logo} alt="logo" />
          <p className={styles.logoName}>AquaSpot</p>
          <p className={styles.formline1}>
            Access clean water information in your area
          </p>

          <div className={styles.inputField}>
            <p>✉️</p>
            <input
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputField}>
            <p>🔒</p>
            <input
              placeholder="Enter Your Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className={styles.forgot}>Forgot Password?</p>
          <button className={styles.shinyButton} onClick={handleLogin}>
            Login
          </button>

          <p className={styles.signupLine}>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
