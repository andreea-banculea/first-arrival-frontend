import { useMutation, useQueryClient } from "@tanstack/react-query";
import { volunteerRequest } from "../../services/user/volunteerRequest";
import { VolunteerRequestType } from "../../types/User";

export const useVolunteerRequest = () => {
  const queryClient = useQueryClient();
  const { mutate: requestVolunteer, error: requestVolunteerError } = useMutation({
    mutationKey: ["requestVolunteer"],
    mutationFn: (volunteerRequestType: VolunteerRequestType) => volunteerRequest(volunteerRequestType),
  });

  return { requestVolunteer, requestVolunteerError };
};
