import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importing FontAwesome5 icons

const ReportedByCard = ({ reportedBy }) => {
  
  const handleCallPress = (phoneNumber:string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'Your device does not support this feature.');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('Error opening URL', err));
  };

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Icon 
          name="user" 
          size={30} 
          color="#4CAF50" 
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Reported by </Text>
          <Text style={styles.valueText}>{reportedBy.name}</Text>
        </View>
        <TouchableOpacity style={styles.callButton} onPress={() => handleCallPress(reportedBy.phoneNumber)}>
          <Icon 
            name="phone" 
            size={24} 
            color="#00796B" 
            style={styles.callIcon}
          />
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
    color: "#00796B"
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
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
    color: "#00796B"
  },
  callButton: {
    marginLeft: 'auto',
    padding: 10,
  },
  callIcon: {
    color: "#00796B",
  },
});

export default ReportedByCard;
