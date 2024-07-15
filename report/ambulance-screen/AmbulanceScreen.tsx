import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SubmitEmergencyScreen from "../submit-emergency-screen/SubmitEmergencyScreen";

import { StackNavigationProp } from "@react-navigation/stack";
import { useDeleteEmergency } from "../hooks/useDeleteEmergency";
import ConfirmationModal from "./ConfirmationModal";
import { useQueryClient } from "@tanstack/react-query";

type AmbulanceScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

export default function AmbulanceScreen({
  navigation,
  route,
}: AmbulanceScreenProps) {
  const handleDetailsForm = () => {
    navigation.navigate("Details Form", route.params);
  };

  const handleSeeRespondersPress = () => {
    navigation.navigate("Responders On Map", route.params);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { emergencyDelete } = useDeleteEmergency();
  const queryClient = useQueryClient();

  const handleCancelRequestPress = () => {
    setIsModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setIsModalVisible(false);
  
    emergencyDelete(route.params.emergency.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["hasAnActiveEmergencyReported"],
        });
        setTimeout(() => {
          navigation.navigate("ReportFirst");
        }, 2000); 
      },
      onError: (error) => {
        console.error("Error canceling emergency request:", error);
      },
    });
  };
  

  return (
    <LinearGradient colors={["#7a2d2e", "#d60202"]} style={styles.container}>
      <Image
        source={require("../../assets/ambulance-icon.png")} 
        style={styles.image}
      />
      <Text style={styles.title}>Ambulance and responders were alarmed</Text>
      <Text style={styles.subtitle}>
        Help us understand better the emergency by giving us more details.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleDetailsForm}>
        <Text style={styles.buttonText}>Details form</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSeeRespondersPress}
      >
        <Text style={styles.buttonText}>See responders on the map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancelRequestPress}>
        <Text style={styles.cancelText}>Cancel request</Text>
      </TouchableOpacity>
      <ConfirmationModal
        visible={isModalVisible}
        onConfirm={handleConfirmCancel}
        onCancel={() => setIsModalVisible(false)}
      />
    </LinearGradient>
  );
}

const AmbulanceStack = createNativeStackNavigator();

export function ReportEmergencyStackAmbulance() {
  return (
    <AmbulanceStack.Navigator>
      <AmbulanceStack.Screen
        name="Ambulance"
        component={AmbulanceScreen}
        options={{ headerShown: false }}
      />
    </AmbulanceStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,

    marginBottom: 30,
    marginLeft: -60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#c10202",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
