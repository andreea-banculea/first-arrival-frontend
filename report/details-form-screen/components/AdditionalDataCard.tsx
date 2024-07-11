import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';

const AdditionalDataCard = ({ additionalData, setAdditionalData }: { additionalData: string, setAdditionalData: (data: string) => void }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <FontAwesome5
          name="comment-dots"
          size={24}
          color="purple"
          style={styles.icon}
        />
        <Text style={styles.label}>Anything else you would like to add?</Text>
      </View>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        multiline
        numberOfLines={4}
        onChangeText={setAdditionalData}
        value={additionalData}
        placeholder="Add any additional information here..."
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: -5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  descriptionInput: {
    height: 80,
  },
});

export default AdditionalDataCard;
