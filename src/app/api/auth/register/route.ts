import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError, authApiServer } from "@/features/auth/services/authApi.server";
import { NAME_IDENTIFIER_CLAIM } from "@/features/auth/constants";
import { decodeJwtPayload } from "@/lib/jwt";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    console.warn("[auth/register] rejected: missing name, email or password");
    return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 });
  }

  const [firstName, ...rest] = String(name).trim().split(/\s+/);
  const lastName = rest.join(" ") || firstName;

  try {
    const result = await authApiServer.register(firstName, lastName, email, password);
    const claims = decodeJwtPayload<Record<string, string>>(result.token);
    const user = { id: claims[NAME_IDENTIFIER_CLAIM], email: result.email, name: result.fullName };

    const cookieStore = await cookies();
    const cookieOptions = {
      path: "/",
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
    };
    cookieStore.set("token", result.token, { ...cookieOptions, httpOnly: true });
    cookieStore.set("user", JSON.stringify(user), cookieOptions);

    return NextResponse.json({ user, token: result.token });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ message: "Unable to reach the server" }, { status: 502 });
  }
}
