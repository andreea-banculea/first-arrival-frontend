import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useActiveRouteName } from "../../routing/ActiveRouteContext";
import DetailsFormScreen from "../details-form-screen/DetialsFormScreen";

import { StackNavigationProp } from "@react-navigation/stack";
import { useGetUserById } from "../hooks/useGetUserById";
import { UserType } from "../../types/User";

type RespondersOnMapScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

export default function RespondersOnMapScreen({
  navigation,
  route,
}: RespondersOnMapScreenProps) {
  const { setActiveRouteName } = useActiveRouteName();
  React.useEffect(() => {
    setActiveRouteName("Responders On Map");
  }, [setActiveRouteName]);

  const emergency = route.params.emergency;
  console.log(route.params);
  const emergencyLocation = route.params.emergency.location;

  const handleDetailsFormPress = () => {
    navigation.navigate("Details Form", route.params);
  };

  const users: UserType[] = []; 

  emergency.volunteersAccepted.map((volunteer: UserType) => {
    const {user, userError, userLoading} = useGetUserById(volunteer.id);
    if (user) {
      users.push(user);
    }
  }
  );

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: emergencyLocation ? emergencyLocation.latitude : 37.78825,
          longitude: emergencyLocation ? emergencyLocation.longitude : -122.4324,
          latitudeDelta: 0.018,
          longitudeDelta: 0.018
        }}
      >
        {emergencyLocation && (
          <Marker coordinate={emergencyLocation} title="Selected Location">
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
