import React from "react";
import "./styles/fonts.css";
import { LoadScript, useJsApiLoader } from "@react-google-maps/api";
import AppRoute from "./Routes/AppRoute.jsx";
const App = () => {

const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBsG_W-SBbDLpSRaVVYIRwGM_GFKh4OFjM',
  });

  if (!isLoaded) return null; // ✅ No loading screen

  return <><AppRoute /></>;
};

export default App;
