"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  blood_group?: string;
  address?: string;
  city?: string;
  role?: "donor" | "recipient" | "admin" | "user";
  is_available?: boolean | number;
  last_donation_date?: string;
  created_at?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, userData?: UserProfile) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    const storedToken = localStorage.getItem("lifedrop_token");
    if (!storedToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    setToken(storedToken);

    try {
      const data = await apiFetch("/auth/me");
      if (data && (data.user || data.id)) {
        const u = data.user || data;
        setUser(u);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.warn("Could not fetch user session from API. Using local token session.");
      // Fallback user object if token exists
      const savedUserStr = localStorage.getItem("lifedrop_user");
      if (savedUserStr) {
        try {
          setUser(JSON.parse(savedUserStr));
        } catch {
          setUser({ id: 1, name: "Registered User", email: "user@lifedrop.com", role: "donor" });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "lifedrop_token") {
        refreshUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (newToken: string, userData?: UserProfile) => {
    localStorage.setItem("lifedrop_token", newToken);
    setToken(newToken);
    if (userData) {
      setUser(userData);
      localStorage.setItem("lifedrop_user", JSON.stringify(userData));
    }
    refreshUser();
  };

  const logout = () => {
    localStorage.removeItem("lifedrop_token");
    localStorage.removeItem("lifedrop_user");
    setToken(null);
    setUser(null);
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem("lifedrop_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: Boolean(token),
        isLoading,
        login,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
