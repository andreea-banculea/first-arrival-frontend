import { useQuery } from "@tanstack/react-query";
import { getEmergencyById } from "../../services/emergencies/getEmergencyById";

export const useGetEmergencyById = (id: number) => {
  const {
    data: emergency,
    error: emergencyError,
    isLoading: emergencyLoading,
  } = useQuery({
    queryKey: ["emergency", id],
    queryFn: () => getEmergencyById(id),
  });

  return { emergency, emergencyError, emergencyLoading };
};
