import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons for the delete icon
import { StyleSheet } from 'react-native';
import { MedicalHistoryPredefined } from '../../../helpers/MedicalHistoryPredefined';

const medicalHistoryIcons: Record<string, string> = {
  "Diabetic": "syringe",
  "Severe allergies": "allergies",
  "Asthma": "lungs",
  "Pregnant": "baby",
  "HIV Positive": "ribbon",
  "Heart Condition": "heart",
  "Epilepsy": "brain",
  "Blood Clotting Disorders": "vial",
  "Chronic Kidney Disease": "band-aid",
  "Chronic Obstructive Pulmonary Disease": "lungs",
  "Cancer": "ribbon",
  "Organ Transplant": "hand-holding-heart",
  "Mental Health Conditions": "brain",
  "Other": "plus", // Default icon for other conditions
};

const predefinedConditions = MedicalHistoryPredefined

type MedicalHistoryCardProps = {
  medicalHistory: any[];
  newCondition: string;
  setNewCondition: (value: string) => void;
  addMedicalHistory: () => void;
  toggleCondition: (index: number) => void;
  deleteCondition: (index: number) => void;
};

const MedicalHistoryCard = ({
  medicalHistory,
  newCondition,
  setNewCondition,
  addMedicalHistory,
  toggleCondition,
  deleteCondition,
}: MedicalHistoryCardProps) => {
  const renderMedicalHistoryItem = ({ item, index }: { item: any, index: number }) => (
    <View style={[styles.item, item.checked && styles.checkedItem]} key={index}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => toggleCondition(index)}
      >
        <FontAwesome5
          name={medicalHistoryIcons[item.label] || medicalHistoryIcons["Other"]}
          size={24}
          color={item.checked ? "white" : "teal"}
          style={styles.icon}
        />
        <Text style={[styles.checkboxLabel, item.checked && styles.checkedLabel]}>
          {item.label}
        </Text>
      </TouchableOpacity>
      {!predefinedConditions.includes(item.label) && (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCondition(index)}>
          <MaterialIcons name="delete" size={24} color="darkred" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <FontAwesome5
          name="file-medical"
          size={28}
          color="teal"
          style={styles.icon}
        />
        <Text style={styles.label}>Medical History</Text>
      </View>
      <FlatList
        data={medicalHistory}
        renderItem={renderMedicalHistoryItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.newConditionRow}>
        <TextInput
          style={styles.newConditionInput}
          placeholder="Add another condition"
          value={newCondition}
          onChangeText={setNewCondition}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={addMedicalHistory}
        >
          <FontAwesome5 name="plus" size={24} color="#c10202" />
        </TouchableOpacity>
      </View>
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    justifyContent: "space-between", // To keep delete button on the right
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Make the item content take up all available space
  },
  checkedItem: {
    backgroundColor: "teal",
    borderColor: "teal",
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  checkedLabel: {
    color: "white",
  },
  deleteButton: {
    marginLeft: 10,
  },
  newConditionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  newConditionInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  iconButton: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MedicalHistoryCard;
