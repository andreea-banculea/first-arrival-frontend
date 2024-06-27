import * as Linking from "expo-linking";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import {
  ActiveRouteProvider,
  useActiveRouteName,
} from "./routing/ActiveRouteContext";
import { DrawerRoute } from "./routing/DrawerRoute";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  Dashboard,
  ResetPasswordScreen,
} from "./screens";
import { Provider } from "react-native-paper";
import { theme } from "./core/theme";
import { LocationProvider } from "./hooks/LocationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, useUser } from "./hooks/UserContext";
import { EmergencyProvider } from "./hooks/EmergencyContext";
import registerNNPushToken from "native-notify";
import { getActiveRouteName } from "./hooks/getActiveRouteName";

const Stack = createStackNavigator();

const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      EmergencyDetail: 'emergency-detail/:emergency',
    },
  },
};

const NavigationHandler: React.FC = () => {
  const { setActiveRouteName } = useActiveRouteName();

  return (
    <NavigationContainer
      linking={linking}
      onStateChange={(state) => {
        if (state) {
          const activeRouteName = getActiveRouteName(state);
          setActiveRouteName(activeRouteName);
        }
      }}
    >
      <DrawerRoute />
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <Text>Loading...</Text>; // Replace with a proper loading component if needed
  }

  return (
    <ActiveRouteProvider>
      {user ? (
        <NavigationHandler />
      ) : (
        <Provider theme={theme}>
          <NavigationContainer independent={true}>
            <Stack.Navigator
              initialRouteName="StartScreen"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      )}
    </ActiveRouteProvider>
  );
};

export default function App() {
  const queryClient = new QueryClient();

  registerNNPushToken(22081, "CskVox7GEbNREhcbeD6kmo");

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <LocationProvider>
          <EmergencyProvider>
            <AppNavigator />
          </EmergencyProvider>
        </LocationProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
