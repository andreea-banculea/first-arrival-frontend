import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "left",
    paddingLeft:20,
    paddingBottom:15,
    marginVertical: 20,
  },
  scrollView: {
    width: "100%",
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between', // This will push the arrow icon to the edge
    backgroundColor: "#fff",
    marginBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  iconWrapper: {
    paddingVertical: 11, // Adjust as necessary
    paddingHorizontal: 15, // Adjust as necessary
    borderRadius: 15, // Rounded corners, adjust for your design
    marginRight: 20,
    alignItems: "center", // Center the icon horizontally
    justifyContent: "center", // Center the icon vertically
    // Add shadow if needed, adjust for your design
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  icon: {
    resizeMode:"contain",
    width: 30,
    height: 40,
    tintColor: "#f7f5f5",
    
  },
  text: {
    flex: 1, // Text takes up the maximum amount of space
    fontWeight: "600",
    fontSize: 16,
    color: "#000000",
    marginRight: 10, // Give some space before the arrow
  },
  arrow: {
    width: 20,
    height: 20,
    marginLeft: 10,
  }
});
