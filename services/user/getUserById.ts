import { UserType } from "../../types/User";
import HttpClient from "../httpClient";

export const getUserById = async (id: number) => {
  try {
    const response = await HttpClient.base.get<UserType>(
      `/users/${id}`
    );
    if (response.status === 200) return response.data;
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
    throw new Error("Could not get user");
  }

  throw new Error("The API returned an unexpected response");
};
