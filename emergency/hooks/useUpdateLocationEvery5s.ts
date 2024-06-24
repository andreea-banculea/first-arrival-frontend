// import { useContext, useEffect, useRef } from "react";
// import { LocationContext } from "../../hooks/LocationContext";
// import { useUpdateLocation } from "./useUpdateLocation";

// export const useUpdateLocationEvery5s = (
//   activeEmergency: boolean,
//   locationId: number
// ) => {
//   const { location, address, fetchCurrentLocation } =
//     useContext(LocationContext);
//   const { locationUpdate, locationUpdateError } = useUpdateLocation();

//   const timeoutRef = useRef<number | null>(null);

//   useEffect(() => {
//     const getLocationData = async () => {
//       if (activeEmergency === true) {
//         const locationData = {
//           id: locationId,
//           name: address!,
//           latitude: location!.coords.latitude,
//           longitude: location!.coords.longitude,
//         };

//         locationUpdate(locationData);
//       }
//     };

//     const intervalId = setInterval(getLocationData, 5000); // Update every 5 seconds

//     return () => {
//       clearInterval(intervalId); // Clear the interval on cleanup
//       if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear any pending timeout
//     };
//   }, [activeEmergency, location, locationId, fetchCurrentLocation]);

//   // Handle potential initial delay (if location data isn't immediately available)
//   useEffect(() => {
//     if (activeEmergency && !location) {
//       timeoutRef.current = setTimeout(async () => {
//         await fetchCurrentLocation(); // Fetch location if necessary
//       }, 5000); // Delay for 5 seconds before fetching
//     }
//   }, [activeEmergency, fetchCurrentLocation, location]);
// };
