import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../../services/locations/getLocationsWithActiveEmergencies";
import { getLocationById } from "../../services/locations/getLocationById";

export const useGetLocationById = (id: number) => {
  const {
    data: location,
    error: locationError,
    isLoading: locationLoading,
  } = useQuery({
    queryKey: ["location"],
    queryFn: () => getLocationById(id),
  });

  return { location, locationError, locationLoading };
};
