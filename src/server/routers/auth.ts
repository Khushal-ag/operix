import { compare } from "bcrypt-ts";
import { ilike, or } from "drizzle-orm";
import { z } from "zod";

import { users } from "@/db/schema";
import { signJwt } from "@/lib/jwt";
import { hashPassword } from "@/lib/utils";

import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        username: z.string().min(2).max(50),
        email: z.string().email().toLowerCase(),
        password: z.string().min(8).max(50),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { username, email, password } = input;

        const existingUser = await ctx.db
          .select()
          .from(users)
          .where(or(ilike(users.email, email), ilike(users.username, username)))
          .limit(1);

        if (existingUser.length > 0) {
          throw new Error("Username or email already exists");
        }

        const hashedPassword = hashPassword(password);

        const [user] = await ctx.db
          .insert(users)
          .values({
            username,
            email,
            password: hashedPassword,
          })
          .returning();

        if (!user) {
          throw new Error("Failed to create user");
        }

        const token = await signJwt({ id: user.id, email: user.email });

        return {
          success: true,
          message: "User registered successfully",
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
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
    .mutation(async ({ ctx, input }) => {
      try {
        const { identifier, password } = input;

        const [user] = await ctx.db
          .select()
          .from(users)
          .where(
            or(
              ilike(users.email, identifier),
              ilike(users.username, identifier),
            ),
          )
          .limit(1);

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const valid = await compare(password, user.password);

        if (!valid) throw new Error("Invalid credentials");

        const token = await signJwt({ id: user.id, email: user.email });

        return {
          success: true,
          message: "Signed in successfully",
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        };
      } catch (error) {
        console.error("Error signing in:", error);
        throw error instanceof Error ? error : new Error("Failed to sign in");
      }
    }),
});
