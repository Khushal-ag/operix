import { asc, count, eq } from "drizzle-orm";
import { z } from "zod";

import { users } from "@/db/schema";

import { privateProcedure, router } from "../trpc";

export const adminRouter = router({
  makeAdmin: privateProcedure
    .input(
      z.object({
        id: z.string(),
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
  getAdmins: privateProcedure
    .input(
      z.object({
        page: z.number().int().positive(),
        totalItems: z.number().int().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { page, totalItems } = input;
        const offset = (page - 1) * totalItems;
        const limit = totalItems;

        const result = await ctx.db
          .select({ count: count() })
          .from(users)
          .where(eq(users.isAdmin, true));

        const totalCount = result[0]?.count ?? 0;
        const totalPages = Math.ceil(totalCount / limit);

        const items = await ctx.db
          .select({
            id: users.id,
            username: users.username,
            email: users.email,
            isAdmin: users.isAdmin,
            createdAt: users.createdAt,
          })
          .from(users)
          .where(eq(users.isAdmin, true))
          .offset(offset)
          .limit(limit)
          .orderBy(asc(users.id));

        return {
          items,
          totalPages,
          totalCount,
          currentPage: page,
        };
      } catch (error) {
        console.error("Error fetching admin users:", error);
        throw new Error("Failed to fetch admin users");
      }
    }),
});
