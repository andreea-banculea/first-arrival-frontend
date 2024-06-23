import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importing FontAwesome5 icons

const AdditionalDataCard = ({ additionalData }: { additionalData: string }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Icon 
          name="comment-dots" 
          size={30} 
          color="purple" 
          style={styles.icon}
        />
        <Text style={styles.label}>Additional Information</Text>
      </View>
      <Text style={styles.valueText}>{additionalData}</Text>
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
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flexWrap: 'wrap', // Ensure text wraps properly
  },
});

export default AdditionalDataCard;
