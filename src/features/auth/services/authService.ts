import { validateEmail } from "@/features/auth/utils/validateEmail";
import type { AuthCredentials, AuthResponse, SignupData } from "@/features/auth/types";

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    if (!validateEmail(credentials.email)) {
      throw new Error("Invalid email address");
    }
    return {
      user: { id: "1", email: credentials.email, name: "User" },
      token: "mock-session-token",
    };
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    if (!validateEmail(data.email)) {
      throw new Error("Invalid email address");
    }
    return {
      user: { id: "1", email: data.email, name: data.name },
      token: "mock-session-token",
    };
  },

  async logout(): Promise<void> {
    return;
  },
};
