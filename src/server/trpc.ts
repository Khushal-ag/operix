import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import type { createContext } from "./context";

export const trpc = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const isAuthenticated = trpc.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const privateProcedure = trpc.procedure.use(isAuthenticated);
