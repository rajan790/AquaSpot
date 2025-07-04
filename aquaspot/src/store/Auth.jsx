import { createContext, useContext, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { supabase } from "../Supabase/supabaseClient";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const savedLogin = localStorage.getItem("isLoggedIn");

  if (savedUser && savedLogin === "true") {
    setUser(JSON.parse(savedUser));
    setIsLoggedIn(true);
    setLoading(false);
    return;
  }

  const checkSession = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user && !error) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", user.id)
        .maybeSingle();

      if (!profileError && profile) {
        const newUser = { name: profile.name, role: profile.role };
        setIsLoggedIn(true);
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("isLoggedIn", "true");
      }
    }
    setLoading(false);
  };

  checkSession();
}, []);

  const login = async (email, password) => {
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) return { success: false, error: loginError };

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return { success: false, error: userError };

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*") 
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) return { success: false, error: profileError };


  localStorage.setItem("user", JSON.stringify({ name: profile.name, role: profile.role }));
  localStorage.setItem("userProfile", JSON.stringify(profile)); 
  localStorage.setItem("isLoggedIn", "true");


  setUser({ name: profile.name, role: profile.role });
  setIsLoggedIn(true);

  return { success: true };
};


const logout = async () => {
  await supabase.auth.signOut();
  setIsLoggedIn(false);
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("userProfile");
  localStorage.removeItem("isLoggedIn");
};



  const EmailSend = async (email, otp) => {
    const templateParams = {
      email: email,
      passcode: otp,
      time: "6:45",
    };

    try {
      const result = await emailjs.send(
        "service_syikt6o",
        "template_mtrv2es",
        templateParams,
        "sW5sfqRqxUZulCFoh"
      );
      console.log("✅ Email sent successfully:", result.text);
      return { success: true };
    } catch (error) {
      console.error("❌ Failed to send email:", error);
      return { success: false, error };
    }
  };

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
  });

  const storeSignupData = (name, email, otp, password) => {
    setSignupData({ name, email, otp, password });
  };

  const completeSignup = async () => {
    const { email, password, name } = signupData;

    const { error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      console.error("❌ Auth signup error:", signUpError.message);
      return { success: false, error: signUpError };
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("❌ Failed to fetch user:", userError?.message);
      return { success: false, error: userError || new Error("No user found") };
    }

    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: user.id,
        email,
        name,
        role: "user",
      },
    ]);

    if (insertError) {
      console.error("❌ Insert profile error:", insertError.message);
      return { success: false, error: insertError };
    }

    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        EmailSend,
        signupData,
        storeSignupData,
        completeSignup,
        loading, // ✅ expose loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
