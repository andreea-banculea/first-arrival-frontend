// // WebSocketService.js
// import { useEffect } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// const WebSocketService = (emergencyId, setVolunteerLocation) => {
//   useEffect(() => {
//     const socket = new SockJS("YOUR_BACKEND_WS_ENDPOINT");
//     const client = new Client({
//       webSocketFactory: () => socket,
//       onConnect: () => {
//         client.subscribe(`/topic/emergency/${emergencyId}`, (message) => {
//           const locationUpdate = JSON.parse(message.body);
//           setVolunteerLocation({
//             latitude: locationUpdate.latitude,
//             longitude: locationUpdate.longitude,
//           });
//         });
//       },
//     });

//     client.activate();

//     return () => {
//       client.deactivate();
//     };
//   }, [emergencyId, setVolunteerLocation]);
// };

// export default WebSocketService;
