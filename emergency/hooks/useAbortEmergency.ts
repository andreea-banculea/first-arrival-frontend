import { useMutation, useQueryClient } from "@tanstack/react-query";
import { abortEmergency } from "../../services/emergencies/abortEmergency";

export const useAbortEmergency = () => {
  const queryClient = useQueryClient();
  const { mutate: emergencyAbort, error: emergencyAbortError } = useMutation({
    mutationKey: ["abortEmergency"],
    mutationFn: (id: number) => abortEmergency(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmergency"] });
    },
  });

  return { emergencyAbort, emergencyAbortError };
};
