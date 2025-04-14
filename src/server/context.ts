import { cookies } from "next/headers";

import db from "@/db/drizzle";
import { verifyJwt } from "@/lib/jwt";

export async function createContext() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  let user = null;

  if (token) {
    const payload = await verifyJwt<{
      id: string;
      email: string;
      username: string;
    }>(token);
    if (payload) {
      user = payload;
    }
  }

  return {
    db,
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
