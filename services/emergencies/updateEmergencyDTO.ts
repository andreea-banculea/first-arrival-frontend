import { EmergencyDTOType, EmergencyType } from "../../types/Emergency";
import HttpClient from "../httpClient";

export const updateEmergencyDTO = async (emergency:EmergencyDTOType): Promise<EmergencyDTOType> => {
  try {

    const response = await HttpClient.base.put<EmergencyDTOType>(
      "/emergencies", emergency);

    if (response.status === 200) {
      return response.data;}
  } catch (error: any) {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error", error.message);
    }
    throw new Error("Could not update emergency");
  }

  throw new Error("The API returned an unexpected response");
};
