import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importing FontAwesome5 icons

const MedicationsCard = ({ medications }: { medications: string[] }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Icon 
          name="prescription-bottle-alt" 
          size={30} 
          color="#FF8A65" 
          style={styles.icon}
        />
        <Text style={styles.label}>Medications</Text>
      </View>
      <FlatList
        data={medications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Icon 
              name="pills" 
              size={20} 
              color="#00796B" 
              style={styles.itemIcon}
            />
            <Text style={styles.valueText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
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

export default MedicationsCard;
