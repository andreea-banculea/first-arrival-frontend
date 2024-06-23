import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  FlatList,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./ReportEmergencyScreen.styles";

import { useActiveRouteName } from "../../routing/ActiveRouteContext";
import SubmitEmergencyScreen from "../submit-emergency-screen/SubmitEmergencyScreen";
import { emergencyOptions } from "../../helpers/EmergencyOptions";

const arrowIcon = require("../../assets/right-arrow.png");

const ReportEmergencyScreen = ({ navigation }) => {
  const { setActiveRouteName } = useActiveRouteName();
  React.useEffect(() => {
    setActiveRouteName("Report");
  }, [setActiveRouteName]);

  const handlePress = (item) => {
    navigation.navigate("Submit Emergency", { emergencyType: item });
  };

  const renderEmergencyOption = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePress(item)}
      activeOpacity={0.6}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={item.colors}
        style={styles.iconWrapper}
      >
        <Image source={item.icon} style={styles.icon} />
      </LinearGradient>
      <Text style={styles.text}>{item.text}</Text>
      <Image
        source={arrowIcon}
        resizeMode="contain"
        style={styles.arrow}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Please, choose the emergency</Text>
      <FlatList
        data={emergencyOptions}
        renderItem={renderEmergencyOption}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const ReportEmergencyStack = createNativeStackNavigator();

function ReportEmergencyStackScreen() {
  return (
    <ReportEmergencyStack.Navigator>
      <ReportEmergencyStack.Screen
        name="Report"
        component={ReportEmergencyScreen}
        options={{ headerShown: false }}
      />
      <ReportEmergencyStack.Screen
        name="Submit Emergency"
        component={SubmitEmergencyScreen}
        options={{ headerShown: false }}
      />
    </ReportEmergencyStack.Navigator>
  );
}

export { ReportEmergencyScreen, ReportEmergencyStackScreen };
