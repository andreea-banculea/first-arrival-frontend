import { useMutation } from "@tanstack/react-query";
import { notifyEmergency } from "../../services/emergencies/notifyEmergency";
import { EmergencyType } from "../../types/Emergency";

export const useNotifyEmergency = () => {
  const { mutate: emergencyNotify, error: emergencyNotifyError } = useMutation({
    mutationKey: ["notifyEmergency"],
    mutationFn: (emergency: EmergencyType) => notifyEmergency(emergency),
  });

  return { emergencyNotify, emergencyNotifyError };
};
