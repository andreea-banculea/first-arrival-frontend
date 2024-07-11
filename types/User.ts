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

export interface VolunteerRequestType{
  userId: number;
  certificationCode: string;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  location?: LocationType | null; 
  phoneNumber: string;
  role: Role; 
  certification?: CertificationType | null; 
  volunteerLevel?: number | null;
}