import { asc, count, eq, ilike, or } from "drizzle-orm";
import { z } from "zod";

import { users } from "@/db/schema";

import { privateProcedure, router } from "../trpc";

export const userRouter = router({
  getAll: privateProcedure
    .input(
      z.object({
        page: z.number().int().positive(),
        totalItems: z.number().int().positive(),
        search: z.string().trim().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { page, totalItems, search } = input;
        const offset = (page - 1) * totalItems;
        const limit = totalItems;

        const searchCondition =
          search ?
            or(
              ilike(users.email, `%${search}%`),
              ilike(users.username, `%${search}%`),
            )
          : undefined;

        const result = await ctx.db
          .select({ count: count() })
          .from(users)
          .where(searchCondition);

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
          .where(searchCondition)
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
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    }),
  getMe: privateProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db
        .select({
          id: users.id,
          username: users.username,
          email: users.email,
          isAdmin: users.isAdmin,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, ctx.user.id))
        .limit(1);

      return user[0] ?? null;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  }),
});
