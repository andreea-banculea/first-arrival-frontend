import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { EmergencyType } from "../types/Emergency";
import { useHasAnActiveEmergencyReported } from "../report/hooks/useHasAnActiveEmergencyReported";
import { useUser } from "./UserContext";

interface EmergencyContextType {
  emergency: EmergencyType | null | undefined;
  emergencyError: Error | null;
  emergencyLoading: boolean;
  refetch: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined | null>(undefined);

export const EmergencyProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: userLoading } = useUser();

  // Only fetch emergency data if the user is defined and not loading
  const shouldFetch = !!user && !userLoading;

  const { emergency, emergencyError, emergencyLoading, refetch } = useHasAnActiveEmergencyReported(shouldFetch);

  return (
    <EmergencyContext.Provider value={{ emergency, emergencyError, emergencyLoading, refetch }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (context === undefined) {
    throw new Error("useEmergency must be used within an EmergencyProvider");
  }
  return context;
};
