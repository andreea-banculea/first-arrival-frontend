import { UserType } from "../../types/User";
import HttpClient from "../httpClient";

export const createUser = async (user: UserType): Promise<UserType> => {
  try {
    const response = await HttpClient.base.post<UserType>("/users", user);

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
