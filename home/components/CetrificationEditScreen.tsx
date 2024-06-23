import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CertificationType } from "../../types/User";
import { useActiveRouteName } from "../../routing/ActiveRouteContext";

export const CertificationEditPage = ({ navigation, route }) => {
  const user = route.params;
  const [certificationCode, setCertificationCode] = useState(
    user.certification ? user.certification.certificationCode : null
  );
  const { setActiveRouteName } = useActiveRouteName();

  useEffect(() => {
    setActiveRouteName("Certification");
  }, [setActiveRouteName]);

  const handleSave = () => {
    // Logic to save the certification code, e.g., make an API call  };
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
