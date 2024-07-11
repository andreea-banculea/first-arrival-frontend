import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';

const MedicationsCard = ({
  medications,
  newMedication,
  setNewMedication,
  addMedication,
  toggleMedication,
  deleteMedication,
}: {
  medications: any[];
  newMedication: string;
  setNewMedication: (value: string) => void;
  addMedication: () => void;
  toggleMedication: (index: number) => void;
  deleteMedication: (index: number) => void;
}) => {
  const renderMedicationItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.item, item.checked && styles.checkedItem]} key={index}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => toggleMedication(index)}
      >
        <FontAwesome5
          name="capsules"
          size={20}
          color={item.checked ? "white" : "darkblue"}
          style={styles.icon}
        />
        <Text style={[styles.checkboxLabel, item.checked && styles.checkedLabel]}>
          {item.label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMedication(index)}>
        <MaterialIcons name="delete" size={24} color="darkred" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <FontAwesome5
          name="prescription-bottle-alt"
          size={24}
          color="darkblue"
          style={styles.icon}
        />
        <Text style={styles.label}>Medications</Text>
      </View>
      <FlatList
        data={medications}
        renderItem={renderMedicationItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.newConditionRow}>
        <TextInput
          style={styles.newConditionInput}
          placeholder="Add medication"
          value={newMedication}
          onChangeText={setNewMedication}
        />
        <TouchableOpacity style={styles.iconButton} onPress={addMedication}>
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
      justifyContent: "space-between", 
    },
    itemContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkedItem: {
      backgroundColor: "#3c3ab5",
      borderColor: "#3c3ab5",
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
  
  export default MedicationsCard;