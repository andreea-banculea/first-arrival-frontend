import { VolunteerRequestType } from "../../types/User";
import HttpClient from "../httpClient";

export const volunteerRequest = async (volunteerRequest: VolunteerRequestType) => {
  try {
    const response = await HttpClient.base.put("/users/volunteer-request", {
      userId: volunteerRequest.userId,
      certificationCode: volunteerRequest.certificationCode,
    });

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
