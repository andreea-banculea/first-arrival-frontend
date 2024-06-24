// VolunteerLocationContext.js
import React, { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

const VolunteerLocationContext = createContext(null);

const VolunteerLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        (location) => {
          setLocation(location);
          // Send location to backend
          sendLocationToBackend(location);
        }
      );
    };

    startLocationUpdates();
  }, []);

  const sendLocationToBackend = async (location) => {
    try {
      await fetch("YOUR_BACKEND_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      });
    } catch (error) {
      console.error("Error sending location to backend", error);
    }
  };

  return (
    <VolunteerLocationContext.Provider value={location}>
      {children}
    </VolunteerLocationContext.Provider>
  );
};

export { VolunteerLocationContext, VolunteerLocationProvider };
