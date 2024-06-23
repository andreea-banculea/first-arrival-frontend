import { EmergencyType } from "../../types/Emergency";
import HttpClient from "../httpClient";

export const hasAnActiveEmergencyReported = async () => {
  try {
    const response = await HttpClient.base.get<EmergencyType | null>(
      `/emergencies/hasActiveEmergency`
    );
    if (response.status === 200) return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.log("Response error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.log("Request error:", error.request);
    } else {
      // Something else happened
      console.log("Error", error.message);
    }
  }
};
