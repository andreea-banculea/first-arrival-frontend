import { useQuery } from "@tanstack/react-query";
import { getLocationsWithActiveEmergencies } from "../../services/locations/getLocationsWithActiveEmergencies";
import { LocationEmergencyType, LocationType } from "../../types/Location";

export const useGetLocationsWithActiveEmergencies = () => {
  const {
    data: locationsData,
    error: locationsError,
    isLoading: locationsLoading,
  } = useQuery<{ key: LocationType }[]>({
    queryKey: ["locations"],
    queryFn: getLocationsWithActiveEmergencies,
  });

  let locations: { key: LocationType }[] = locationsData;
  return { locations, locationsError, locationsLoading };
};
