import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptEmergency } from "../../services/emergencies/acceptEmergency";

export const useAcceptEmergency = () => {
  const { mutate: emergencyAccept, error: emergencyAcceptError } = useMutation({
    mutationKey: ["acceptEmergency"],
    mutationFn: (id: number) => acceptEmergency(id),
  });

  return { emergencyAccept, emergencyAcceptError };
};
