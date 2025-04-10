import { compare } from "bcrypt-ts";
import { ilike, or } from "drizzle-orm";
import { z } from "zod";

import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/utils";

import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  signUp: publicProcedure
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
          .returning({
            id: users.id,
            username: users.username,
            email: users.email,
          });

        return {
          success: true,
          user: result[0],
          message: "User registered successfully",
        };
      } catch (error) {
        console.error("Error signing up:", error);
        throw error instanceof Error ? error : new Error("Failed to sign up");
      }
    }),

  signIn: publicProcedure
    .input(
      z.object({
        identifier: z.string().trim(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { identifier, password } = input;

        // Find user by email or username
        const user = await db
          .select()
          .from(users)
          .where(
            or(
              ilike(users.email, identifier),
              ilike(users.username, identifier),
            ),
          )
          .limit(1);

        // Check if no user was found
        if (!user || user.length === 0) {
          throw new Error("Invalid credentials");
        }

        const foundUser = user[0];

        // Additional check to ensure foundUser has a password
        if (!foundUser?.password) {
          throw new Error("Invalid credentials");
        }

        // Verify password
        const passwordMatch = await compare(password, foundUser.password);

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          success: true,
          user: {
            ...foundUser,
            password: undefined,
          },
          message: "Signed in successfully",
        };
      } catch (error) {
        console.error("Error signing in:", error);
        throw error instanceof Error ? error : new Error("Failed to sign in");
      }
    }),
});
