import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

const severityLevels = ["Low", "Medium", "High", ""];
const severityIcons = ["info-circle", "exclamation-triangle", "heartbeat", "exclamation-triangle"]; 
const severityColors = ["#FFCDD2", "#FF8A65", "#D32F2F", "#FF8A65"]; 

const SeverityCard = ({ severity }: { severity: string }) => {
  let severityIndex;
  switch (severity) {
    case "LOW":
      severityIndex = 0;
      break;
    case "MEDIUM":
      severityIndex = 1;
      break;
    case "HIGH":
      severityIndex = 2;
      break;
    default:
      severityIndex = 3;
      break;
  }

  return (
    <Card style={[styles.card, { borderColor: severityColors[severityIndex] }]}>
      <View style={styles.cardContent}>
        <Icon
          name={severityIcons[severityIndex]}
          size={30}
          color={severityColors[severityIndex]}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Severity</Text>
          <Text
            style={[styles.valueText, { color: severityColors[severityIndex] }]}
          >
            {severityLevels[severityIndex]}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderWidth: 2, 
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flexDirection: "column",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SeverityCard;
