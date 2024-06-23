import { LocationType } from "../../types/Location";
import HttpClient from "../httpClient";

export const getLocationsWithActiveEmergencies = async (): Promise<
  { key: LocationType }[]
> => {
  try {
    const response = await HttpClient.base.get<{ key: LocationType }[]>(
      "/locations/active"
    );

    if (
      response.status === 200 &&
      typeof response.data === "object" &&
      !Array.isArray(response.data)
    ) {
      const locationsObject = response.data;

      return locationsObject;
    } else {
      console.error("Unexpected response format:", response.data);
      throw new Error("Unexpected response format");
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
    throw new Error("Could not get locations");
  }
};
