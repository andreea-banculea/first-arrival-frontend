import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";
import axios from "axios";

export type SaveTokenType = {
  userId: number;
  token: string;
};

export async function registerForPushNotificationsAsync(
  userId: number,
  saveTokenCallback: (tokenRequest: SaveTokenType) => void
) {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;

  const tokenSendRequest: SaveTokenType = {
    userId: userId,
    token: token,
  };

  console.log(tokenSendRequest);

  if (tokenSendRequest.token && tokenSendRequest.userId) {
    saveTokenCallback(tokenSendRequest);
    console.log("Push token saved to backend:", token);
  }

  return token;
}
