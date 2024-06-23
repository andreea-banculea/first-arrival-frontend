export type LocationType = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type LocationEmergencyType = {
    id: number;
    location : LocationType
  };
