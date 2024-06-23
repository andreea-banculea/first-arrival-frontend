import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLoggedInUser } from '../services/user/getLoggedInUser';
import { UserType } from '../types/User';
import { logoutUser } from '../services/user/logoutUser';
interface UserContextType {
  user: UserType | undefined;
  setUser: (user: UserType | undefined) => void;
  loading: boolean;
  refetchUser: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const loggedInUser = await getLoggedInUser();
      setUser(loggedInUser);
    } catch (error) {
      console.error('Failed to fetch logged in user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refetchUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(undefined);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, refetchUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
