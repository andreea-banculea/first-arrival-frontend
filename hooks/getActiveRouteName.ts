import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Helper function to find the active route name from nested navigator states
export function getActiveRouteName(state: { routes: { [x: string]: any; }; index: string | number; }) {
  const route = state.routes[state.index];
  // Dive into nested navigators
  if (route.state) {
    // Recurse to find the deepest active route
    return getActiveRouteName(route.state);
  }
  return route.name;
}
