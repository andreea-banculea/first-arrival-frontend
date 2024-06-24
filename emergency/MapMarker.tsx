import React from "react";
import { Image, View } from "react-native";
import { Marker } from "react-native-maps";

function MapMarker({
  navigation,
  emergency,
}: {
  navigation: any;
  emergency: any;
}) {
  // Hook to get the navigation object
  const goToEmergencyDetail = () => {
    navigation.navigate("Emergency", emergency); // Use the name of your screen as defined in your stack navigator
  };

  return (
    <Marker coordinate={emergency.location} onPress={goToEmergencyDetail}>
      <View
        style={{
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/emergency-pin.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>
    </Marker>
  );
}

export default MapMarker;
