import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  abortEmergencyButton: {
    backgroundColor: "#c10202",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 55,
    width: 300,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    bottom: -295,
  },
  abortEmergencyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
