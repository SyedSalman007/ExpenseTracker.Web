import { AUTH_LOGIN_PATH, AUTH_REGISTER_PATH } from "@/features/auth/constants";

interface BackendAuthResponse {
  token: string;
  email: string;
  fullName: string;
}

export class ApiError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

async function callAuthApi(path: string, body: unknown): Promise<BackendAuthResponse> {
  const baseUrl = process.env.EXPENSE_API_BASE_URL;
  if (!baseUrl) {
    throw new ApiError("EXPENSE_API_BASE_URL is not configured", 500);
  }

  const url = `${baseUrl}${path}`;
  const startedAt = Date.now();

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (error) {
    const elapsedMs = Date.now() - startedAt;
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`API network error on POST ${url} after ${elapsedMs}ms. Error: ${message}`);
    throw new ApiError("Unable to reach the server", 502);
  }

  const elapsedMs = Date.now() - startedAt;
  console.log(`API call POST ${url} returned status ${res.status} in ${elapsedMs}ms.`);

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data && (data.message as string)) || "Request failed";
    console.error(`API error: POST ${url} returned status ${res.status}. Reason: ${message}`);
    throw new ApiError(message, res.status);
  }

  return data as BackendAuthResponse;
}

export const authApiServer = {
  login(email: string, password: string) {
    return callAuthApi(AUTH_LOGIN_PATH, { email, password });
  },

  register(firstName: string, lastName: string, email: string, password: string) {
    return callAuthApi(AUTH_REGISTER_PATH, { firstName, lastName, email, password });
  },
};
