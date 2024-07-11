import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useGetEmergencyById } from "../../emergency/hooks/useGetEmergencyById";
import { useActiveRouteName } from "../../routing/ActiveRouteContext";
import { LocationType } from "../../types/Location";
import { UserType } from "../../types/User";
import DetailsFormScreen from "../details-form-screen/DetialsFormScreen";

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
  }, [initialEmergency.id, setActiveRouteName]);

  useEffect(() => {
    if (emergency) {
      setVolunteers(emergency.volunteersAccepted);

      const locations: LocationType[] = emergency.volunteersAccepted
        .filter((volunteer) => volunteer.location)
        .map((volunteer) => volunteer.location as LocationType);

      setVolunteersLocation(locations);
    }
  }, [emergency?.volunteersAccepted, setActiveRouteName]);

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
          <Marker coordinate={volunteerLocation} title="Volunteer Location">
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
                tintColor={"#c10202"}
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
    elevation: 3, 
    shadowColor: "#000",
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
