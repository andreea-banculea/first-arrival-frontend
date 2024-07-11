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
      console.log("Response error:", error.response.data);
    } else if (error.request) {
      console.log("Request error:", error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
