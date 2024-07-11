import { SaveTokenType } from "../../notifications/registerForPushNotificationsAsync";
import { UserType } from "../../types/User";
import HttpClient from "../httpClient";

export const saveToken = async (tokenRequest: SaveTokenType) => {
  try {
    const response = await HttpClient.base.post("/users/save-token", {
      userId: tokenRequest.userId,
      token: tokenRequest.token,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error", error.message);
    }
  }
};
