import * as React from "react";
import { Image } from "react-native";
import { HomeStackScreen } from "../home/ProfileScreen";
import { EmergencyStackScreen } from "../emergency/EmergenciesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ReportEmergencyStackFirstScreen } from "../report/sos-screen/SOSScreen";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export const HomeRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white", // Background color of the tab bar
        },
        tabBarActiveTintColor: "black", // Active tab text color
        tabBarInactiveTintColor: "grey", // Inactive tab text color
      }}
    >
      <Tab.Screen
        name="ReportTab"
        component={ReportEmergencyStackFirstScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/report-emergency-icon.png")} // Make sure the path is correct
              style={{
                width: size * 1.5,
                height: size * 1.5,
                tintColor: color,
                marginTop: 5,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EmergenciesTab"
        component={EmergencyStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/emergencies-icon.png")} // Make sure the path is correct
              style={{
                width: size * 1.6,
                height: size * 1.6,
                tintColor: color,
                marginTop: 5,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/profile-icon.png")} // Make sure the path is correct
              style={{
                width: size * 1,
                height: size * 1,
                tintColor: color,
                marginTop: 15,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
