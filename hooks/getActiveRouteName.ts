import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export function getActiveRouteName(state: { routes: { [x: string]: any; }; index: string | number; }) {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
}
