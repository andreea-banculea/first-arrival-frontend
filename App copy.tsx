import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
      <Button onPress={() => navigation.toggleDrawer()} title="Open drawer" />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export default function App() {
  return (
    // <NavigationContainer>
    //   <Drawer.Navigator initialRouteName="Home">
    //     <Drawer.Screen name="Home" component={HomeScreen} />
    //     <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    //   </Drawer.Navigator>
    // </NavigationContainer>
    <SafeAreaView>
      <Text>Hi</Text>
    </SafeAreaView>
  );
}
