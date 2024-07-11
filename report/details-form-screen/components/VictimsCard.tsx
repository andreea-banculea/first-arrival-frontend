import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';


const VictimsCard = ({ open, value, items, setOpen, setValue, setItems }: {
  open: boolean,
  value: string,
  items: any[],
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setItems: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  return (
    <View style={{ zIndex: 1000 }}>
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome
            name="users"
            size={24}
            color="#4CAF50"
            style={styles.icon}
          />
          <Text style={styles.label}>Number of Victims</Text>
        </View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={styles.dropdown}
          zIndex={5000} 
        />
      </Card>
    </View>
  );
};

export default VictimsCard;

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  dropdown: {
    zIndex: 5000, 
  },
});
