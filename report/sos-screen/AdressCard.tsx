import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { reverseGeocode } from "../../hooks/reverseGeocode";
import useGetLocation from "../../hooks/useGetLocation";
import { LocationContext } from "../../hooks/LocationContext";


const AddressCard = () => {
  const { location, address, fetchCurrentLocation } = useContext(LocationContext);
  return (
    <View style={styles.card}>
      <MaterialIcons name="place" size={30} color="#c10202" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Your current address</Text>
        <Text style={styles.text}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    paddingBottom:15,
    marginBottom:10,
    height: 90,
  },
  icon: {
    marginRight: 10, 
  },
  textContainer: {
    flexDirection: "column",  
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default AddressCard;
