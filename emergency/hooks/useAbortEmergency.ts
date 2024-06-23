import { useMutation } from "@tanstack/react-query";
import { abortEmergency } from "../../services/emergencies/abortEmergency";

export const useAbortEmergency = () => {
  const { mutate: emergencyAbort, error: emergencyAbortError } = useMutation({
    mutationKey: ["abortEmergency"],
    mutationFn: (id: number) => abortEmergency(id),
  });

  return { emergencyAbort, emergencyAbortError };
};
