import { useMutation } from "@tanstack/react-query";
import { updateLocation } from "../../services/locations/updateLocation";
import { LocationType } from "../../types/Location";

export const useUpdateLocation = () => {
  const { mutate: locationUpdate, error: locationUpdateError } = useMutation({
    mutationKey: ["locationUpdate"],
    mutationFn: (location: LocationType) => updateLocation(location),
  });

  return { locationUpdate, locationUpdateError };
};
