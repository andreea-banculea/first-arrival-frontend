import { ReactNode, createContext, useContext } from "react";
import { EmergencyType } from "../types/Emergency";
import { useHasAnActiveEmergencyReported } from "../report/hooks/useHasAnActiveEmergencyReported";

interface EmergencyContextType {
  emergency: EmergencyType | null | undefined;
  emergencyError: Error | null;
  emergencyLoading: boolean;
  refetch: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined | null>(undefined);

export const EmergencyProvider = ({ children }: { children: ReactNode }) => {
  const { emergency, emergencyError, emergencyLoading, refetch } = useHasAnActiveEmergencyReported();

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
