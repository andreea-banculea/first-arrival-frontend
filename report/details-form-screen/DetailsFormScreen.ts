
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: -5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  severityIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  segmentedControl: {
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  descriptionInput: {
    height: 80,
  },
  checkboxContainer: {
    marginVertical: 10,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#c10202",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  segmentedControl: {
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    marginBottom: 20,
  },
  iconButton: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
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
});