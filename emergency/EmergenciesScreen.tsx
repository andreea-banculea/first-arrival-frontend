import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import useGetLocation from "../hooks/useGetLocation";
import { styles } from "./EmergenciesScreen.styles";
import MapMarker from "./MapMarker";
import { useEffect, useRef, useState } from "react";
import EmergencyDetailScreen from "../details/EmergencyDetailScreen";
import { useGetActiveEmergencies } from "./hooks/useGetActiveEmergencies";

import { StackNavigationProp } from "@react-navigation/stack";
import { useAbortEmergency } from "./hooks/useAbortEmergency";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

type EmergenciesScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

export function EmergenciesScreen({
  navigation,
  route,
}: EmergenciesScreenProps) {
  const mapViewRef = useRef<MapView>(null);
  const userLocation = useGetLocation();
  const params = route.params
    ? route.params
    : { activeEmergency: false, points: [] };

  const [points, setPoints] = useState(params.points);
  const [activeEmergency, setActiveEmergency] = useState(
    params.activeEmergency
  );
  const emergencyId = params.emergencyId;
  const { emergencyAbort } = useAbortEmergency();

  useEffect(() => {
    setPoints(params.points);
    setActiveEmergency(params.activeEmergency);
  }, [route.params]);

  useEffect(() => {
    if (points.length > 0 && mapViewRef.current) {
      mapViewRef.current.fitToCoordinates(points, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [points]);

  const handleAbortEmergencyPress = () => {
    emergencyAbort(emergencyId);
    setActiveEmergency(false);
    setPoints([]);
    if (mapViewRef.current && userLocation) {
      const region = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0722,
        longitudeDelta: 0.0421,
      };
      mapViewRef.current.animateToRegion(region, 1000);
    }
  };

  const { emergencies, emergenciesError, emergenciesLoading, refetchEmergencies } = useGetActiveEmergencies();

  useFocusEffect(
    React.useCallback(() => {
      refetchEmergencies();
    }, [])
  );
    

  if (emergenciesError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading emergency</Text>
      </View>
    );
  }

  if (emergenciesLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading emergencies...</Text>
      </View>
    );
  }

  if (!Array.isArray(emergencies)) {
    console.error("Expected emergencies to be an array, but got:", emergencies);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Unexpected data format</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userLocation ? (
        <MapView
          ref={mapViewRef}
          style={styles.map}
          initialRegion={{
            latitude: userLocation?.coords.latitude || 0,
            longitude: userLocation?.coords.longitude || 0,
            latitudeDelta: 0.0722,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {points.length > 0 && (
            <Polyline coordinates={points} strokeWidth={4} strokeColor="red" />
          )}
          {emergencies.map((emergency, index) => (
            <MapMarker
              key={index}
              emergency={emergency}
              navigation={navigation}
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading user location...</Text>
      )}
      {activeEmergency && (
        <TouchableOpacity
          style={styles.abortEmergencyButton}
          onPress={handleAbortEmergencyPress}
        >
          <Text style={styles.abortEmergencyButtonText}>Abort emergency</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const Stack = createNativeStackNavigator();

export function EmergencyStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Emergencies"
        component={EmergenciesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Emergency" component={EmergencyDetailScreen} />
    </Stack.Navigator>
  );
}
