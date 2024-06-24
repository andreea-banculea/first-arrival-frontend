// import { useContext, useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { LocationContext } from "../../hooks/LocationContext";
// import HttpClient from "../../services/httpClient";

// const useEmergencyLocationUpdate = (
//   activeEmergency: boolean,
//   locationId: number
// ) => {
//   const { location, fetchCurrentLocation, address } =
//     useContext(LocationContext);
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     let intervalId;

//     const updateLocation = async () => {
//       if (location) {
//         const { latitude, longitude } = location.coords;

//         // Update location in the database using HttpClient
//         try {
//           await HttpClient.base.put("/locations", {
//             id: locationId, // Assuming you need userId to identify which location to update
//             latitude,
//             longitude,
//             name: address,
//           });
//           // Invalidate and refetch queries related to the location if necessary
//           queryClient.invalidateQueries({ queryKey: ["getEmergency"] });
//         } catch (error) {
//           console.error("Failed to update location", error);
//         }
//       }
//     };

//     if (activeEmergency) {
//       fetchCurrentLocation(); // Fetch initial location
//       updateLocation(); // Update initial location
//       intervalId = setInterval(() => {
//         fetchCurrentLocation(); // Fetch location every 5 seconds
//         updateLocation(); // Update location every 5 seconds
//       }, 500000);
//     } else if (intervalId) {
//       clearInterval(intervalId);
//     }

//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, [
//     activeEmergency,
//     location,
//     locationId,
//     fetchCurrentLocation,
//     queryClient,
//   ]);

//   return null; // This hook does not return any values
// };

// export default useEmergencyLocationUpdate;
