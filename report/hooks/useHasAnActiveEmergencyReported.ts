import { useQuery } from "@tanstack/react-query";
import { hasAnActiveEmergencyReported } from "../../services/emergencies/hasAnActiveEmergencyReported";

export const useHasAnActiveEmergencyReported = () => {
  const {
    data: emergency,
    error: emergencyError,
    isLoading: emergencyLoading,
    refetch,
  } = useQuery({
    queryKey: ["hasAnActiveEmergencyReported"],
    queryFn: hasAnActiveEmergencyReported,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return { emergency, emergencyError, emergencyLoading, refetch };
};
