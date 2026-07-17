"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authService } from "@/features/auth/services/authService";
import type { AuthCredentials, SignupData, User } from "@/features/auth/types";
import { getCookie } from "@/lib/cookie";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cookie = getCookie("user");
    if (cookie) setUser(JSON.parse(cookie));
  }, []);

  const login = useCallback(async (credentials: AuthCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    try {
      const response = await authService.signup(data);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, signup, logout }),
    [user, isLoading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
