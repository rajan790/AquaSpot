import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const MyMap = ({ onLocationSelect }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null); // ✅ Only one marker

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setCurrentLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        err => console.error('Location error:', err)
      );
    }
  }, []);

  const handleMapClick = (e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };

    setSelectedMarker(newMarker); // ✅ replace old with new
    if (onLocationSelect) {
      onLocationSelect(newMarker); // ✅ send to parent
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation || { lat: 30.7333, lng: 76.7794 }}
      zoom={13}
      onClick={handleMapClick}
    >
      {selectedMarker && (
        <Marker position={selectedMarker} />
      )}
    </GoogleMap>
  );
};

export default MyMap;
