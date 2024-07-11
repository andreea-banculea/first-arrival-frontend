import { LocationType } from "../../types/Location";
import HttpClient from "../httpClient";

export const getLocationById = async (id:number) => {
  try {
    const response = await HttpClient.base.get<LocationType>(`/location/${id}`);
    if (response.status === 200) return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error", error.message);
    }
    throw new Error("Could not get locations");
  }

  throw new Error("The API returned an unexpected response");
};
