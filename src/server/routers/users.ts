import { asc, count, ilike, or } from "drizzle-orm";
import { z } from "zod";

import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/utils";

import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  get: publicProcedure
    .input(
      z.object({
        page: z.number().int().positive(),
        totalItems: z.number().int().positive(),
        search: z.string().trim().optional(),
      }),
    )
    .query(async ({ input }) => {
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

        // Get total count for pagination
        const result = await db
          .select({ count: count() })
          .from(users)
          .where(searchCondition);

        const totalCount = result[0]?.count ?? 0;
        const totalPages = Math.ceil(totalCount / limit);

        // Get paginated users
        const items = await db
          .select({
            id: users.id,
            username: users.username,
            email: users.email,
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

  create: publicProcedure
    .input(
      z.object({
        username: z.string().trim().min(2).max(50),
        email: z.string().email().trim().toLowerCase(),
        password: z.string().min(8).max(50),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { username, email, password } = input;

        // Check if user already exists
        const existingUser = await db
          .select({ id: users.id })
          .from(users)
          .where(or(ilike(users.email, email), ilike(users.username, username)))
          .limit(1);

        if (existingUser.length > 0) {
          throw new Error("Username or email already exists");
        }

        const result = await db
          .insert(users)
          .values({
            username,
            email,
            password: hashPassword(password),
          })
          .returning({ id: users.id });

        return result[0];
      } catch (error) {
        console.error("Error creating user:", error);
        throw error instanceof Error ? error : (
            new Error("Failed to create user")
          );
      }
    }),
});
