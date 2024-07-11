import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmergency } from "../../services/emergencies/createEmergency";
import { EmergencyType } from "../../types/Emergency";

export const useCreateEmergency = () => {
  const queryClient = useQueryClient();

  const { mutate: emergencyCreate, error: createEmergencyError } = useMutation({
    mutationKey: ["createEmergency"],
    mutationFn: (emergency: EmergencyType) => createEmergency(emergency),
    onSuccess: () => {
      queryClient.invalidateQueries("emergencies");
    },
  });

  return { emergencyCreate, createEmergencyError };
};
