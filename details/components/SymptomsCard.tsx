import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'; 

const SymptomsCard = ({ description }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Icon 
          name="stethoscope" 
          size={30} 
          color="#FF8A65" 
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Symptoms Description</Text>
          <Text style={styles.valueText}>{description}</Text>
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
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
  },
  icon: {
    marginRight: 15,
    color: "#FF8A65"
  },
  textContainer: {
    flex: 1, 
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
    color: "#333",
    flexWrap: 'wrap', 
  },
});

export default SymptomsCard;
