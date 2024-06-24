import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useActiveRouteName } from "../../routing/ActiveRouteContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useGetEmergencyById } from "../../emergency/hooks/useGetEmergencyById";
import { UserType } from "../../types/User";
import DetailsFormScreen from "../details-form-screen/DetialsFormScreen";
import WebSocketService from "../../services/websocket/WebSocketService";
import { useAcceptEmergency } from "../../emergency/hooks/useAcceptEmergency";
import { LocationType } from "../../types/Location";
import { useQueryClient } from "@tanstack/react-query";

type RespondersOnMapScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

export default function RespondersOnMapScreen({
  navigation,
  route,
}: RespondersOnMapScreenProps) {
  const { setActiveRouteName } = useActiveRouteName();
  const [volunteersLocation, setVolunteersLocation] = useState<LocationType[]>(
    []
  );
  const [volunteers, setVolunteers] = useState<UserType[]>([]);

  const initialEmergency = route.params.emergency;
  const emergencyLocation = initialEmergency.location;
  const { emergency, emergencyError, emergencyLoading, refetchEmergency } =
    useGetEmergencyById(initialEmergency.id);

  useEffect(() => {
    setActiveRouteName("Responders On Map");
    // WebSocketService(initialEmergency.id, setVolunteerLocation);
  }, [initialEmergency.id, setActiveRouteName]);
  // useEffect(() => {
  //   if (emergency) {
  //     console.log("Emergency volunteers", emergency.volunteersAccepted);
  //     setVolunteers(emergency.volunteersAccepted);
  //     console.log("Volunteers", volunteers);
  //     const volunteersLocations: LocationType[] = [];
  //     volunteers.map((volunteer) => {
  //       if (volunteer.location) volunteersLocation.push(volunteer.location);
  //       console.log("p------Non null location", volunteersLocation);
  //     });
  //     setVolunteersLocation(volunteersLocations);
  //     console.log("asdgasdgfasdf s ----- asd-fa-sdf-a ---- Volunteers Location", volunteersLocation);
  //   }
  // }, [emergency]);

  useEffect(() => {
    if (emergency) {
      setVolunteers(emergency.volunteersAccepted);

      const locations: LocationType[] = emergency.volunteersAccepted
        .filter((volunteer) => volunteer.location)
        .map((volunteer) => volunteer.location as LocationType); // Assuming location is of type LocationType

      setVolunteersLocation(locations);
      console.log("Volunteers Location", locations);
    }
  }, [emergency?.volunteersAccepted, setActiveRouteName]);

  // useEffect(() => {
  //   refetchEmergency();
  // });

  const handleDetailsFormPress = () => {
    navigation.navigate("Details Form", route.params);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: emergencyLocation ? emergencyLocation.latitude : 37.78825,
          longitude: emergencyLocation
            ? emergencyLocation.longitude
            : -122.4324,
          latitudeDelta: 0.018,
          longitudeDelta: 0.018,
        }}
      >
        {emergencyLocation && (
          <Marker coordinate={emergencyLocation} title="Emergency Location">
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/emergency-pin.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
          </Marker>
        )}
        {volunteersLocation.map((volunteerLocation, index) => (
          <Marker
            coordinate={volunteerLocation}
            title="Volunteer Location"

          >
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/volunteer-on-map-icon.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
                tintColor={'#c10202'}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.alertButton}
        onPress={handleDetailsFormPress}
      >
        <Text style={styles.alertButtonText}>Details Form</Text>
      </TouchableOpacity>
    </View>
  );
}

const RespondersOnMapStack = createNativeStackNavigator();

export function ReportEmergencyRespondersOnMapStack() {
  return (
    <RespondersOnMapStack.Navigator>
      <RespondersOnMapStack.Screen
        name="Responders On Map"
        component={RespondersOnMapScreen}
        options={{ headerShown: false }}
      />
      <RespondersOnMapStack.Screen
        name="Details Form"
        component={DetailsFormScreen}
        options={{ headerShown: false }}
      />
    </RespondersOnMapStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    bottom: -280,
  },
  alertButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
