import { useQuery } from "@tanstack/react-query";
import { hasAnActiveEmergencyReported } from "../../services/emergencies/hasAnActiveEmergencyReported";

export const useHasAnActiveEmergencyReported = (shouldFetch: boolean) => {
  const {
    data: emergency,
    error: emergencyError,
    isLoading: emergencyLoading,
    refetch,
  } = useQuery({
    queryKey: ["hasAnActiveEmergencyReported"],
    queryFn: hasAnActiveEmergencyReported,
    enabled: shouldFetch, // Only enable the query if shouldFetch is true
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return { emergency, emergencyError, emergencyLoading, refetch };
};
