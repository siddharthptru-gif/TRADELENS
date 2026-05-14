import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, logoutUser } from '../lib/auth';
import { ensureUserSeed } from '../lib/userSeed';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logoutUser: () => Promise<void>;
  refreshUserSeed: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  logoutUser: async () => {},
  refreshUserSeed: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUserSeed = async (currentUser: User) => {
    try {
      await ensureUserSeed(currentUser);
    } catch (error) {
      console.error("Error seeding user:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await handleUserSeed(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserSeed = async () => {
    if (user) {
      await handleUserSeed(user);
    }
  };

  const logout = async () => {
    await logoutUser();
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    logoutUser: logout,
    refreshUserSeed,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
