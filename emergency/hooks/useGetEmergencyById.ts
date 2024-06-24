import { useQuery } from "@tanstack/react-query";
import { getEmergencyById } from "../../services/emergencies/getEmergencyById";

export const useGetEmergencyById = (id: number) => {
  const {
    data: emergency,
    error: emergencyError,
    isLoading: emergencyLoading,
    refetch: refetchEmergency,
  } = useQuery({
    queryKey: ["getEmergencies", id],
    queryFn: () => getEmergencyById(id),
    refetchOnMount: true,
    refetchInterval: 5000,
  });

  return { emergency, emergencyError, emergencyLoading, refetchEmergency };
};
