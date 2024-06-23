import * as Location from "expo-location";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { reverseGeocode } from "./reverseGeocode";

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
  const [location, setLocation] = useState<Location.LocationObject | null>(
      null
  );
  const [address, setAddress] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, address, fetchCurrentLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };

