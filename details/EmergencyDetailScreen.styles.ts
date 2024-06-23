import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2", // Light grey background for better contrast
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 150, // Ensure there is enough padding at the bottom for the button
    marginHorizontal:-5,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconWrapper: {
    padding: 15,
    borderRadius: 50,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },
  text: {
    fontWeight: "700",
    fontSize: 24,
    color: "#000",
  },
  acceptButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#b30000", // Use a color that indicates urgency
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal:20,
    alignItems: "center",
    justifyContent: "center",
    height:60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  acceptButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
