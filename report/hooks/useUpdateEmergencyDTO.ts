import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmergencyDTO } from "../../services/emergencies/updateEmergencyDTO";
import { EmergencyDTOType } from "../../types/Emergency";

export const useUpdateEmergencyDTO = () => {
  const queryClient = useQueryClient();
  const { mutate: emergencyUpdate, error: updateEmergencyError } = useMutation({
    mutationKey: ["updateEmergency"],
    mutationFn: (emergency: EmergencyDTOType) => updateEmergencyDTO(emergency),
    onSuccess: () => {
      queryClient.invalidateQueries("emergencies");
    },
  });

  return { emergencyUpdate, updateEmergencyError };
};
