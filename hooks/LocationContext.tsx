import * as Location from "expo-location";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { reverseGeocode } from "./reverseGeocode";
import { useUser } from "./UserContext";
import { useUpdateLocation } from "../emergency/hooks/useUpdateLocation";

const updateLocationInDatabase = async (locationUpdate, userId, address, latitude, longitude) => {
  if (!userId || !locationUpdate) {
    return;
  }
  const newLocation = {
    id: userId,
    latitude: latitude,
    longitude: longitude,
    name: address,
  };
  locationUpdate(newLocation);
};

interface LocationContextType {
  location: Location.LocationObject | null;
  address: string | null;
  fetchCurrentLocation: () => void;
}

const defaultValue: LocationContextType = {
  location: null,
  address: null,
  fetchCurrentLocation: () => {},
};

const LocationContext = createContext<LocationContextType>(defaultValue);

interface LocationProviderProps {
  children: ReactNode;
}

const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { user, loading } = useUser();
  const { locationUpdate } = useUpdateLocation();

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    if (location.coords) {
      const address = await reverseGeocode(
        location.coords.latitude,
        location.coords.longitude
      );
      setAddress(address);
    }
  };

  useEffect(() => {
    fetchCurrentLocation();

    const startForegroundLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        alert('Permission to access location was denied');
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000, // Update every 10 seconds
          distanceInterval: 30, // Update every 10 meters
        },
        async (location) => {
          const newAddress = await reverseGeocode(location.coords.latitude, location.coords.longitude);
          updateLocationInDatabase(locationUpdate, user?.location?.id, newAddress, location.coords.latitude, location.coords.longitude);
          setLocation(location);
          setAddress(newAddress);
        }
      );
    };

    startForegroundLocationUpdates();
  }, [user, locationUpdate]);

  return (
    <LocationContext.Provider
      value={{ location, address, fetchCurrentLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
