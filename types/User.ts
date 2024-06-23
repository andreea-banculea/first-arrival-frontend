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
  location?: LocationType | null; // Assuming LocationType is defined elsewhere
  phoneNumber: string;
  role: Role; // Assuming Role is an enum or type defined elsewhere
  certification?: CertificationType | null; // Optional field
  volunteerLevel?: number | null; // Optional field
}
