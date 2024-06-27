import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../../hooks/LocationContext";
import { useActiveRouteName } from "../../routing/ActiveRouteContext";
import AmbulanceScreen from "../ambulance-screen/AmbulanceScreen";
import { ReportEmergencyScreen } from "../emergency-type-screen/ReportEmergencyScreen";

import { StackNavigationProp } from "@react-navigation/stack";
import { useCreateEmergency } from "../hooks/useCreateEmergency";
import { EmergencyType, StatusEnum } from "../../types/Emergency";
import { LocationType } from "../../types/Location";
import { useCreateLocation } from "../hooks/useCreateLocation";
import { reverseGeocode } from "../../hooks/reverseGeocode";
import { useUser } from "../../hooks/UserContext";
import { UserType } from "../../types/User";
import axios from "axios"; // Import axios to send notification via native-notify
import { registerForPushNotificationsAsync } from "../../notifications/registerForPushNotificationsAsync";

type SubmitEmergencyScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Radius of Earth in kilometers

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

export default function SubmitEmergencyScreen({
  navigation,
  route,
}: SubmitEmergencyScreenProps) {
  const { setActiveRouteName } = useActiveRouteName();
  React.useEffect(() => {
    setActiveRouteName("Submit Emergency");
  }, [setActiveRouteName]);

  const { user, loading } = useUser();
  const { location, address, fetchCurrentLocation } =
    useContext(LocationContext);
  const [markerLocation, setMarkerLocation] = useState<null | {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>(null);
  const googlePlacesRef = useRef(null);
  const mapViewRef = useRef<MapView>(null);

  useEffect(() => {
    if (address) {
      googlePlacesRef.current?.setAddressText(address);
    }
  }, [address]);

  useEffect(() => {
    if (location) {
      const firstMarkerLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005, // Set zoom level
        longitudeDelta: 0.005,
      };
      setMarkerLocation(firstMarkerLocation);
      mapViewRef.current?.animateToRegion(firstMarkerLocation, 1000);
    }
  }, [location]);

  const handleLocationSelect = (data: any, details: any) => {
    if (details && details.geometry && details.geometry.location) {
      const newLocation = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.005, // Set zoom level
        longitudeDelta: 0.005,
      };
      setMarkerLocation(newLocation);
      mapViewRef.current?.animateToRegion(newLocation, 1000);
    }
  };

  const { emergencyCreate } = useCreateEmergency();
  const { locationCreate } = useCreateLocation();

  const handleAlertPress = async () => {
    const address = await reverseGeocode(
      markerLocation!.latitude,
      markerLocation!.longitude
    );
    const newLocation: LocationType = {
      id: 0,
      name: address as unknown as string,
      latitude: markerLocation!.latitude,
      longitude: markerLocation!.longitude,
    };

    const createLocationPromise = new Promise<LocationType>((resolve, reject) => {
      locationCreate(newLocation, {
        onSuccess: (data) => resolve(data),
        onError: (error) => reject(error),
      });
    });

    // Await the resolution of the location creation
    const createdLocation = await createLocationPromise;

    const newEmergency: EmergencyType = {
      id: 0,
      location: createdLocation,
      reportedBy: user || {} as UserType,
      emergencyType: route.params.emergencyType.text,
      status: StatusEnum.pending,
      timestamp: new Date().toISOString(),
      severity: null,
      nrOfVictims: null,
      symptomsDescription: null,
      medicalHistory: [],
      medications: [],
      additionalInformation: null,
      volunteersAccepted: [],
    };

    const createEmergencyPromise = new Promise<EmergencyType>((resolve, reject) => {
      emergencyCreate(newEmergency, {
        onSuccess: (data) => resolve(data),
        onError: (error) => reject(error),
      });
    });

    const createdEmergency = await createEmergencyPromise;

    const distance = haversineDistance(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      {
        latitude: markerLocation!.latitude,
        longitude: markerLocation!.longitude,
      }
    ).toFixed(2);

    // Send Push Notification using native-notify
    const pushToken = await registerForPushNotificationsAsync();
    if (pushToken) {
      try {
        await axios.post('https://app.nativenotify.com/api/notification', {
          appId: 22081,
          appToken: "CskVox7GEbNREhcbeD6kmo",
          title: "New Emergency Alert!",
          body: `An emergency has been reported ${distance} km away. Please respond.`,
          pushData: { emergencyId: createdEmergency },
          target: pushToken,
          deepLink: `first-arrival://emergency-detail/${createdEmergency}` // Add deep link URL
        });
        console.log('Notification sent successfully');
      } catch (error) {
        console.error('Failed to send notification:', error);
      }
    }

    navigation.navigate("Ambulance", {
      emergency: createdEmergency,
    });
  };

  const handleUseCurrentLocationPress = () => {
    if (address) {
      googlePlacesRef.current?.setAddressText(address);
    }
    if (location) {
      const firstMarkerLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005, // Set zoom level
        longitudeDelta: 0.005,
      };
      setMarkerLocation(firstMarkerLocation);
      mapViewRef.current?.animateToRegion(firstMarkerLocation, 1000);
    }
  };

  const GOOGLE_PLACES_API_KEY = "AIzaSyD9zPoFduOqt6sr0CDiz70i-an8KrMJToI";

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: location ? location.coords.latitude : 37.78825,
          longitude: location ? location.coords.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markerLocation && (
          <Marker coordinate={markerLocation} title="Selected Location" />
        )}
      </MapView>
      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        placeholder="Enter your address"
        onPress={handleLocationSelect}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
          location: location
            ? `${location.coords.latitude},${location.coords.longitude}`
            : undefined,
          radius: 50000, // 50 km radius
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          predefinedPlacesDescription: styles.predefinedPlacesDescription,
        }}
        fetchDetails={true}
      />
      <TouchableOpacity style={styles.alertButton} onPress={handleAlertPress}>
        <Text style={styles.alertButtonText}>Alert first responders</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUseCurrentLocationPress}>
        <View style={styles.card}>
          <MaterialIcons
            name="place"
            size={30}
            color="#c10202"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.cardheader}>Use current address</Text>
            <Text style={styles.cardtext}>{address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const SubmitEmergencyStack = createNativeStackNavigator();

export function ReportEmergencyStackSubmitScreen() {
  return (
    <SubmitEmergencyStack.Navigator>
      <SubmitEmergencyStack.Screen
        name="Submit Emergency"
        component={SubmitEmergencyScreen}
        options={{ headerShown: false }}
      />
      <SubmitEmergencyStack.Screen
        name="Report"
        component={ReportEmergencyScreen}
        options={{ headerShown: false }}
      />
      <SubmitEmergencyStack.Screen
        name="Ambulance"
        component={AmbulanceScreen}
        options={{ headerShown: false }}
      />
    </SubmitEmergencyStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 28.5,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: "#000000",
    tintColor: "grey",
    textAlign: "center",
    paddingLeft: 30,
    marginBottom: 50,
  },
  textInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 30,
    width: "89%",
  },
  textInput: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: "#1faadb",
  },
  alertButton: {
    backgroundColor: "#c10202",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 60,
    width: 250,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  alertButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    paddingBottom: 15,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  textContainer: {
    flexDirection: "column", // Stack texts vertically
  },
  cardheader: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 5, // Space between header and address text
  },
  cardtext: {
    fontSize: 16,
    color: "#333",
  },
});
