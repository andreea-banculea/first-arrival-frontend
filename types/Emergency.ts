import { User } from "@react-native-google-signin/google-signin";
import { LocationType } from "./Location";
import { UserType } from "./User";
export type MedicalHistoryType = {
  id: number;
  name: string;
}

export enum StatusEnum {
  pending = "PENDING",
}

export enum SeverityEnum {
  low = "LOW",
  medium = "MEDIUM",
  high = "HIGH"
}

export function getSeverityEnum(severity: number): SeverityEnum {
  switch (severity) {
    case 0:
      return SeverityEnum.low;
    case 1:
      return SeverityEnum.medium;
    case 2:
      return SeverityEnum.high;
    default:
      throw new Error("Severity not found");
  }
}

export type Medication = {
  id: number;
  name: string;
}

export type EmergencyType = {
  id: number;
  location: LocationType;
  reportedBy: UserType;
  status: StatusEnum;
  timestamp: string;
  emergencyType: string;
  severity: SeverityEnum | null;
  nrOfVictims: string | null;
  symptomsDescription: string | null;
  medicalHistory: MedicalHistoryType[];
  medications: Medication[];
  additionalInformation: string | null;
  volunteersAccepted: UserType[];
};

export type EmergencyDTOType = {
  id: number;
  locationId: number;
  reportedById: number;
  status: StatusEnum;
  timestamp: string;
  emergencyType: string;
  severity: SeverityEnum | null;
  nrOfVictims: string | null;
  symptomsDescription: string | null;
  medicalHistory: string[];
  medications: string[];
  additionalInformation: string | null;
  volunteersAcceptedIds: number[];
};