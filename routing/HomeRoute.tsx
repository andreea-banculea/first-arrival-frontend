import * as React from "react";
import { Image } from "react-native";
import { HomeStackScreen } from "../home/ProfileScreen";
import { EmergencyStackScreen } from "../emergency/EmergenciesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ReportEmergencyStackFirstScreen } from "../report/sos-screen/SOSScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useUser } from "../hooks/UserContext";

const Tab = createBottomTabNavigator();

export const HomeRoute = () => {
  const { user, loading } = useUser();

  const tabScreens = [
    <Tab.Screen
      key="ReportTab"
      name="ReportTab"
      component={ReportEmergencyStackFirstScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require("../assets/report-emergency-icon.png")} 
            style={{
              width: size * 1.5,
              height: size * 1.5,
              tintColor: color,
              marginTop: 5,
            }}
          />
        ),
      }}
    />,
    user && user.role === "VOLUNTEER" && (
      <Tab.Screen
        key="EmergenciesTab"
        name="EmergenciesTab"
        component={EmergencyStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/emergencies-icon.png")} 
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
    ),
    <Tab.Screen
      key="ProfileTab"
      name="ProfileTab"
      component={HomeStackScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require("../assets/profile-icon.png")} 
            style={{
              width: size,
              height: size,
              tintColor: color,
              marginTop: 15,
            }}
          />
        ),
      }}
    />,
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white", 
        },
        tabBarActiveTintColor: "black", 
        tabBarInactiveTintColor: "grey",
      }}
    >
      {tabScreens.filter(Boolean)}
    </Tab.Navigator>
  );
};
