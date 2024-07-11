import { EmergencyType } from "../../types/Emergency";
import { LocationType } from "../../types/Location";
import HttpClient from "../httpClient";

export const createLocation = async (
  location: LocationType
): Promise<LocationType> => {
  try {
    const response = await HttpClient.base.post<LocationType>(
      `/locations`,
      location
    );

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
    throw new Error("Could not create location");
  }

  throw new Error("The API returned an unexpected response");
};
