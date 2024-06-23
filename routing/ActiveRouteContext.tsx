import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveRouteContextType {
  activeRouteName: string;
  setActiveRouteName: (routeName: string) => void; // Correctly typed setter function
}

interface ProviderProps {
  children: ReactNode;  // Typing for children props
}

const ActiveRouteContext = createContext<ActiveRouteContextType | undefined>(undefined);

export const useActiveRouteName = () => {
  const context = useContext(ActiveRouteContext);
  if (!context) {
    throw new Error('useActiveRouteName must be used within a ActiveRouteProvider');
  }
  return context;
};

export const ActiveRouteProvider: React.FC<ProviderProps> = ({ children }) => {
  const [activeRouteName, setActiveRouteName] = useState<string>('Home');
  
  const value = { activeRouteName, setActiveRouteName };

  return (
    <ActiveRouteContext.Provider value={value}>
      {children}
    </ActiveRouteContext.Provider>
  );
};
