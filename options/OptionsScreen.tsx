import * as React from "react";
import { Button, View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

function OptionsScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <StatusBar />
      <Text>Options Screen</Text>
    </SafeAreaView>
  );
}

const HomeStack = createNativeStackNavigator();

function  OptionsStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Options" component={OptionsScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
}

export { OptionsScreen, OptionsStackScreen };
