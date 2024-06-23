import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmergency } from "../../services/emergencies/deleteEmergency";

export const useDeleteEmergency = () => {
  const queryClient = useQueryClient();

  const { mutate: emergencyDelete, error: deleteEmergencyError } = useMutation({
    mutationKey: ["deleteEmergency"],
    mutationFn: (id: number) => deleteEmergency(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["emergencies"],
      });
    },
  });

  return { emergencyDelete, deleteEmergencyError };
};