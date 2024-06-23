import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveEmergencies } from "../../services/emergencies/getActiveEmergencies";

export const useGetActiveEmergencies = () => {
  const queryClient = useQueryClient();
  const {
    data: emergencies,
    error: emergenciesError,
    isLoading: emergenciesLoading,
    refetch,
  } = useQuery({
    queryKey: ["emergencies"],
    queryFn: getActiveEmergencies,
  });

  const refetchEmergencies = () => {
    queryClient.invalidateQueries(["emergencies"]);
  };

  return { emergencies, emergenciesError, emergenciesLoading, refetchEmergencies };
};
