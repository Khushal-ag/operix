"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { User } from "@/types";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/server/client";

const formSchema = z.object({
  identifier: z.string().trim(),
  password: z.string().min(8).max(50),
});

type SignInResponse = {
  token: string;
  user: User;
};

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const authenticateUser = trpc.auth.signIn.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const { token } = (await authenticateUser.mutateAsync(
        values,
      )) as SignInResponse;

      document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure`;

      router.push("/admin");
      form.reset();
    } catch (err) {
      setError(
        //@ts-expect-error unknown type
        (err?.message as string) || "Failed to sign in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {error && (
            <Alert variant="destructive" className="flex items-center">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Username or Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ?
              <Loader className="mr-2 size-4 animate-spin" />
            : null}
            Sign in
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Dont have an account?{" "}
          <Link href="/signup" className="text-orange-500 underline">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
