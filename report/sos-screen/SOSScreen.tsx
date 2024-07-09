import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEmergency } from "../../hooks/EmergencyContext";
import AmbulanceScreen from "../ambulance-screen/AmbulanceScreen";
import DetailsFormScreen from "../details-form-screen/DetialsFormScreen";
import { ReportEmergencyScreen } from "../emergency-type-screen/ReportEmergencyScreen";
import SubmitEmergencyScreen from "../submit-emergency-screen/SubmitEmergencyScreen";
import RespondersOnMapScreen from "../responders-on-map-screen/RespondersOnMapScreen"; // Add this line
import AdressCard from "./AdressCard";
import { StatusBar } from "expo-status-bar";

export default function SOSScreen({ navigation }) {
  const { emergency, refetch } = useEmergency();

  useFocusEffect(
    useCallback(() => {
      refetch();
      if (emergency !== null && emergency !== undefined && emergency !== "") {
        navigation.navigate("Ambulance", { emergency });
      }
    }, [emergency, navigation, refetch])
  );

  const handlePress = () => {
    navigation.navigate("Report");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Are you in a emergency?</Text>
      <Text style={styles.text}>
        Press the button below and help will reach you soon.
      </Text>
      <View style={styles.outerShadow}>
        <View style={styles.shadowLayer}>
          <TouchableOpacity onPress={handlePress} style={styles.buttonWrapper}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#7a2d2e", "#d60202"]} // Example gradient colors
              style={styles.button}
            >
              <Text style={styles.buttonText}>SOS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <AdressCard />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -50,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    paddingLeft: 20,
    paddingTop: 15,
  },
  text: {
    fontSize: 20,
    color: "#000000",
    tintColor: "grey",
    textAlign: "center",
    paddingLeft: 30,
    marginBottom: 50,
    marginVertical: 20,
    marginHorizontal: 30,
  },
  outerShadow: {
    borderRadius: 150,
    backgroundColor: "#eb8181",
    padding: 25,
    shadowColor: "red",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    marginBottom:50
  },
  shadowLayer: {
    borderRadius: 150,
    backgroundColor: "#ab0202",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
    padding: 25,
  },
  buttonWrapper: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 10,
    shadowColor: "white",
    shadowRadius: 70,
  },
  button: {
    borderRadius: 100,
    width: 165,
    height: 165,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back-outline" size={30} color="black" />
    </TouchableOpacity>
  );
}

const SOSStack = createNativeStackNavigator();

export function ReportEmergencyStackFirstScreen() {
  return (
    <SOSStack.Navigator>
      <SOSStack.Screen
        name="ReportFirst"
        component={SOSScreen}
        options={{ headerShown: false }}
      />
      <SOSStack.Screen
        name="Report"
        component={ReportEmergencyScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: "",
        }}
      />
      <SOSStack.Screen
        name="Submit Emergency"
        component={SubmitEmergencyScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: "",
        }}
      />
      <SOSStack.Screen
        name="Ambulance"
        component={AmbulanceScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: "",
        }}
      />
      <SOSStack.Screen
        name="Details Form"
        component={DetailsFormScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: "",
        }}
      />
      <SOSStack.Screen
        name="Responders On Map"
        component={RespondersOnMapScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: "",
        }}
      />
    </SOSStack.Navigator>
  );
}
