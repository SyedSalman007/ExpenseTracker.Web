export function decodeJwtPayload<T = Record<string, unknown>>(token: string): T {
  const payload = token.split(".")[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const json = atob(base64);
  return JSON.parse(json) as T;
}

export function isTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const { exp } = decodeJwtPayload<{ exp?: number }>(token);
    return typeof exp === "number" && exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
