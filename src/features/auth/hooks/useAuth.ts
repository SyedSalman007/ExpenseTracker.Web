"use client";

import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import type { AuthCredentials, SignupData } from "@/features/auth/types";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export type { AuthCredentials, SignupData };
