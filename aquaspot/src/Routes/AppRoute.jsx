import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../Pages/users/HomePage';
import LoginPage from '../Pages/users/LoginPage';
import AddSpotPage from '../Pages/users/AddSpotPage';
import UserRoute from './guards/UserRoute';
import AdminRoute from './guards/AdminRoute';
import Thanks from '../Pages/users/Thanks';
import { useAuth } from '../store/Auth';
import Admin from '../Pages/Admin/Admin';
import SignupPage from '../Pages/users/SignupPage';
import OtpPage from '../Pages/users/OtpPage';
import LoadingComponent from '../Components/Common/LoadingComponent';
import SingleSpot from '../Components/Common/SingleSpot';


const AppRoute = () => {
  const { isLoggedIn, user, loading } = useAuth();
  const [animationDone, setAnimationDone] = useState(false);

 
  if (!animationDone && loading) {
    return <LoadingComponent onComplete={() => setAnimationDone(true)} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          !isLoggedIn ? (
            <LoginPage />
          ) : user?.role === 'admin' ? (
            <Navigate to="/admin" replace />
          ) : (
            <HomePage />
          )
        }
      />

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Admin />} />
      </Route>

      <Route path="/signup" element={<SignupPage />} />
      <Route element={<UserRoute />}>
        <Route path="/addSpot" element={<AddSpotPage />} />
        <Route path="/thanks" element={<Thanks />} />
      </Route>
      <Route path='/spot' element={<SingleSpot/>}/>  
      <Route path="/verification" element={<OtpPage />} />
      <Route path="*" element={<p>404 - Page Not Found</p>} />
    </Routes>
  );
};

export default AppRoute;
