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
      // Server responded with a status other than 200 range
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something else happened
      console.error("Error", error.message);
    }
  }
};