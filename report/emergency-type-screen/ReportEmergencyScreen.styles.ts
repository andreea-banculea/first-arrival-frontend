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
    justifyContent: 'space-between', 
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
    paddingVertical: 11, 
    paddingHorizontal: 15, 
    borderRadius: 15, 
    marginRight: 20,
    alignItems: "center", 
    justifyContent: "center", 
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
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
    color: "#000000",
    marginRight: 10, 
  },
  arrow: {
    width: 20,
    height: 20,
    marginLeft: 10,
  }
});
