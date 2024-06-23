import React, { useState, useEffect, SetStateAction } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";

export default function useGetLocation() {
  const [location, setLocation] = useState<Location.LocationObject | undefined>(
    undefined
  );
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        // if (!Device.isDevice) {
        //   setErrorMsg(
        //     "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        //   );
        //   return;
        // }
      } catch (err) {
        console.error(err);
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return location;
}
