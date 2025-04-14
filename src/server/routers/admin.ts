import { eq } from "drizzle-orm";
import { z } from "zod";

import { users } from "@/db/schema";

import { privateProcedure, router } from "../trpc";

export const adminRouter = router({
  makeAdmin: privateProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        const result = await ctx.db
          .update(users)
          .set({ isAdmin: true })
          .where(eq(users.id, id))
          .returning();

        return result[0];
      } catch (error) {
        console.error("Error making user admin:", error);
        throw new Error("Failed to make user admin");
      }
    }),
});
