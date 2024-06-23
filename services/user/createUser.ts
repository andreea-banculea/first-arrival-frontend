import { UserType } from "../../types/User";
import HttpClient from "../httpClient";

export const createUser = async (user: UserType): Promise<UserType> => {
  try {
    console.log("user", user);
    const response = await HttpClient.base.post<UserType>("/users", user);

    if (response.status === 200) {
        console.log("response", response.data);
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
