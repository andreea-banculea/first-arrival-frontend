import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CertificationType, VolunteerRequestType } from "../../types/User";
import { useActiveRouteName } from "../../routing/ActiveRouteContext";
import { useVolunteerRequest } from "../hooks/useVolunteerRequest";

export const CertificationEditPage = ({ navigation, route }) => {
  const user = route.params;
  const [certificationCode, setCertificationCode] = useState(
    user.certification ? user.certification.certificationCode : null
  );
  const { setActiveRouteName } = useActiveRouteName();

  useEffect(() => {
    setActiveRouteName("Certification");
  }, [setActiveRouteName]);
console.log(user);
  const { requestVolunteer, requestVolunteerError } = useVolunteerRequest();
  const handleSave = () => {
    const volunteerRequest:VolunteerRequestType = {
      userId: user.id,
      certificationCode: certificationCode,
    };

    requestVolunteer(volunteerRequest,{
      onSuccess: (data: CertificationType) => {
        navigation.navigate("Profile");
      },
      onError: (error: any) => {
        console.error("Error requesting volunteer", error);
      },
    
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Certification Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your certification code"
          value={certificationCode}
          onChangeText={setCertificationCode}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Send request</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#c10202",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
