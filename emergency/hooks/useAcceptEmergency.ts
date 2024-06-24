import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptEmergency } from "../../services/emergencies/acceptEmergency";

export const useAcceptEmergency = () => {
  const queryClient = useQueryClient();

  const { mutate: emergencyAccept, error: emergencyAcceptError } = useMutation({
    mutationKey: ["acceptEmergency"],
    mutationFn: (id: number) => acceptEmergency(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEmergencies"],
        refetchType: "all",
      });
    },
  });

  return { emergencyAccept, emergencyAcceptError };
};
