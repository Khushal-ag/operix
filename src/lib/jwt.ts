import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const secret = new TextEncoder().encode(JWT_SECRET);

export async function signJwt(
  payload: {
    id: string;
    email: string;
    username: string;
  },
  expiresIn = "7d",
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .setIssuedAt()
    .sign(secret);
}

export async function verifyJwt<T>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as T;
  } catch {
    return null;
  }
}
