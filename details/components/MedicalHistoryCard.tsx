import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { medicalHistoryIcons, separateConditions } from '../../helpers/MedicalHistoryPredefined';

interface MedicalHistoryCardProps {
  medicalHistory: string[];
}

const MedicalHistoryCard: React.FC<MedicalHistoryCardProps> = ({ medicalHistory }) => {
  const { predefinedConditions, customConditions } = separateConditions(medicalHistory);
  
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Icon 
          name="file-medical" 
          size={30} 
          color="#4CAF50" 
          style={styles.icon}
        />
        <Text style={styles.label}>Medical History</Text>
      </View>
      <FlatList
        data={predefinedConditions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Icon 
              name={medicalHistoryIcons[item as keyof typeof medicalHistoryIcons] || medicalHistoryIcons["Other"]} 
              size={20} 
              color="#00796B" 
              style={styles.itemIcon}
            />
            <Text style={styles.valueText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
      {customConditions ? (
        <View style={styles.itemContainer}>
          <Icon 
            name={medicalHistoryIcons["Other"]} 
            size={20} 
            color="#00796B" 
            style={styles.itemIcon}
          />
          <Text style={styles.valueText}>{customConditions}</Text>
        </View>
      ) : null}
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  itemIcon: {
    marginRight: 10,
  },
  valueText: {
    fontSize: 16,
    color: "#333",
  },
  flatListContainer: {
    paddingTop: 10,
  },
});

export default MedicalHistoryCard;
