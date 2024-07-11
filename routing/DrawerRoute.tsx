import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import { createDrawerNavigator, DrawerView } from "@react-navigation/drawer";
import { HomeRoute } from "./HomeRoute";
import { useActiveRouteName } from "./ActiveRouteContext";

const Drawer = createDrawerNavigator();

export function DrawerRoute() {
  const { activeRouteName } = useActiveRouteName();
  const hiddenHeaderRoutes = [
    "Emergency",
    "Report",
    "Submit Emergency",
    "Ambulance",
    "Details Form",
    "Responders On Map",
    "Certification"
  ];
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerView defaultStatus={"open"} {...props} />
      )}
    >
      <Drawer.Screen
        name="Home"
        component={HomeRoute}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
          return {
            title: routeName.replace("Tab", ""),
            headerShown: !hiddenHeaderRoutes.includes(activeRouteName),
          };
        }}
      />
    </Drawer.Navigator>
  );
}
