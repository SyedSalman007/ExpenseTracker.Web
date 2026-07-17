import { validateEmail } from "@/features/auth/utils/validateEmail";
import type { AuthCredentials, AuthResponse, SignupData } from "@/features/auth/types";

async function parseAuthResponse(res: Response): Promise<AuthResponse> {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message ?? "Something went wrong. Please try again.");
  }
  return data as AuthResponse;
}

async function postAuth(path: string, body: unknown): Promise<AuthResponse> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Network error. Please try again.");
  }
  return parseAuthResponse(res);
}

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    if (!validateEmail(credentials.email)) {
      throw new Error("Invalid email address");
    }
    return postAuth("/api/auth/login", credentials);
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    if (!validateEmail(data.email)) {
      throw new Error("Invalid email address");
    }
    return postAuth("/api/auth/register", data);
  },

  async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  },
};
