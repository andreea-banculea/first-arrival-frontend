import { useMutation } from "@tanstack/react-query";
import { createLocation } from "../../services/locations/createLocation";
import { LocationType } from "../../types/Location";

export const useCreateLocation = () => {
  const { mutate: locationCreate, error: locationCreateError } = useMutation({
    mutationKey: ["createLocation"],
    mutationFn: (location: LocationType) => createLocation(location),
  });

  return { locationCreate, locationCreateError };
};
