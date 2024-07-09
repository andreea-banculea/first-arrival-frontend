import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getEmergencyOptionByText } from "../helpers/EmergencyOptions";
import { LocationContext } from "../hooks/LocationContext";
import { useActiveRouteName } from "../routing/ActiveRouteContext";
import { styles } from "./EmergencyDetailScreen.styles";
import AdditionalDataCard from "./components/AdditionalDataCard";
import MedicalHistoryCard from "./components/MedicalHistoryCard";
import MedicationsCard from "./components/MedicamentationCard";
import SeverityCard from "./components/ServerityCard";
import SymptomsCard from "./components/SymptomsCard";
import VictimsCard from "./components/VictimsCard";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

import { StackNavigationProp } from "@react-navigation/stack";
import { useAcceptEmergency } from "../emergency/hooks/useAcceptEmergency";
import ReportedByCard from "./components/ReportedByCard";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateLocation } from "../emergency/hooks/useUpdateLocation";
import { LocationType } from "../types/Location";
import { useUser } from "../hooks/UserContext";

type EmergencyDetailScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

export default function EmergencyDetailScreen({
  navigation,
  route,
}: EmergencyDetailScreenProps) {
  const { setActiveRouteName } = useActiveRouteName();
  const { user, loading } = useUser();
  const { location, address, fetchCurrentLocation } =
    useContext(LocationContext);
  useEffect(() => {
    setActiveRouteName("Emergency");
  }, [setActiveRouteName]);

  const emergency = route.params;

  const emergencyType = getEmergencyOptionByText(emergency.emergencyType);
  if (emergencyType === undefined) {
    throw new Error("Emergency type not found");
  }

  const markerCoordinates = {
    latitude: emergency.location.latitude,
    longitude: emergency.location.longitude,
  };
  const [route1, setRoute1] = useState<Coordinate[]>([]);

  const getDirections = async (startLoc: string, destinationLoc: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyB0M7jXkz-kFZvt1BwErw0cm2R220YD_YA`
      );
      if (response.data.status === "OK") {
        const points = decode(response.data.routes[0].overview_polyline.points);
        setRoute1(points);
        navigation.navigate("Emergencies", {
          points: points,
          activeEmergency: true,
          emergencyId: emergency.id,
        });
      } else {
        Alert.alert("Directions Error", response.data.status);
        setRoute1([]);
      }
    } catch (error) {
      console.error("Failed to fetch directions", error);
      Alert.alert("Error", "Failed to fetch directions");
    }
  };

  const { emergencyAccept } = useAcceptEmergency();
  const { locationUpdate } = useUpdateLocation();


  const handleMarkerPress = (coord: Coordinate) => {
    const updatedLocation: LocationType = {
      id: user!.location!.id,
      name: address!,
      latitude: location!.coords.latitude,
      longitude: location!.coords.longitude,
    };
    emergencyAccept(emergency.id);
    locationUpdate(updatedLocation);
    const startLoc = `${location?.coords.latitude},${location?.coords.longitude}`;
    const destinationLoc = `${coord.latitude},${coord.longitude}`;
    getDirections(startLoc, destinationLoc);
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        data={[]}
        renderItem={({ item }) => <Text>{item}</Text>}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <View style={styles.title}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={emergencyType.colors}
                  style={styles.iconWrapper}
                >
                  <Image source={emergencyType.icon} style={styles.icon} />
                </LinearGradient>
                <Text style={styles.text}>{emergencyType.text}</Text>
              </View>
            </View>
            <ReportedByCard reportedBy={emergency.reportedBy} />
            <SeverityCard severity={emergency.severity} />
            <VictimsCard numPeopleInvolved={emergency.nrOfVictims} />
            <SymptomsCard description={emergency.symptomsDescription} />
            <MedicalHistoryCard
              medicalHistory={emergency.medicalHistory.map(
                (item: { name: string }) => item.name
              )}
            />
            <MedicationsCard
              medications={emergency.medications.map(
                (item: { name: string }) => item.name
              )}
            />
            <AdditionalDataCard
              additionalData={emergency.additionalInformation}
            />
          </>
        }
      />

      <TouchableOpacity
        style={styles.acceptButton}
        onPress={() =>
          handleMarkerPress({
            latitude: markerCoordinates.latitude,
            longitude: markerCoordinates.longitude,
          })
        }
      >
        <Text style={styles.acceptButtonText}>Accept emergency</Text>
      </TouchableOpacity>
    </View>
  );
}

const DetailsViewStack = createNativeStackNavigator();

export function ReportEmergencyStackView() {
  return (
    <DetailsViewStack.Navigator>
      <DetailsViewStack.Screen
        name="Details View"
        component={EmergencyDetailScreen}
        options={{ headerShown: false }}
      />
    </DetailsViewStack.Navigator>
  );
}

export function decode(
  polyline: string,
  accuracy: number = 5
): { latitude: number; longitude: number }[] {
  let index = 0,
    lat = 0,
    lng = 0,
    shift = 0,
    result = 0,
    byte = null;
  const coordinates: { latitude: number; longitude: number }[] = [];

  while (index < polyline.length) {
    byte = null;
    (shift = 0), (result = 0);

    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = result = 0;
    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lng += result & 1 ? ~(result >> 1) : result >> 1;
    coordinates.push({
      latitude: lat / Math.pow(10, accuracy),
      longitude: lng / Math.pow(10, accuracy),
    });
  }

  return coordinates;
}
