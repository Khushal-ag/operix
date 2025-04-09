import { asc } from "drizzle-orm";

import db from "@/db/drizzle";
import { users } from "@/db/schema";

import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  get: publicProcedure.query(async () => {
    return await db.select().from(users).orderBy(asc(users.id));
  }),
});
