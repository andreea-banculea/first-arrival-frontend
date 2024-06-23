import { LocationType } from "./Location";
export enum Role {
  USER = "USER",
  VOLUNTEER = "VOLUNTEER",
  INSTITUTION = "INSTITUTION",
  ADMIN = "ADMIN",
}

export interface CertificationType {
  id: number;
  certificationCode: string;
  expirationDate: Date;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  location: LocationType; // Assuming LocationType is defined elsewhere
  role: Role; // Assuming Role is an enum or type defined elsewhere
  certification?: CertificationType; // Optional field
  volunteerLevel?: number; // Optional field
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  location: LocationType; // Assuming LocationType is defined elsewhere
  role: Role; // Assuming Role is an enum or type defined elsewhere
  certification?: CertificationType; // Assuming CertificationType is defined elsewhere, optional field
  volunteerLevel?: number; // Optional field
}
