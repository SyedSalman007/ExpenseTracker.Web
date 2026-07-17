export const createLoginSuccessToast = (message?: string) => ({
  type: "success" as const,
  message: message || "Signed in successfully",
  id: "auth-login-success",
});

export const createLoginErrorToast = (message?: string) => ({
  type: "error" as const,
  message: message || "Unable to sign in",
  id: "auth-login-error",
});

export const createSignupSuccessToast = (message?: string) => ({
  type: "success" as const,
  message: message || "Account created successfully",
  id: "auth-signup-success",
});

export const createSignupErrorToast = (message?: string) => ({
  type: "error" as const,
  message: message || "Unable to create account",
  id: "auth-signup-error",
});
