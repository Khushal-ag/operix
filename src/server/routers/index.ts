import { router } from "../trpc";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { userRouter } from "./users";

export const appRouter = router({
  users: userRouter,
  auth: authRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
