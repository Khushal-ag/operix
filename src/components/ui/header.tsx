"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { CircleUser, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import { trpc } from "@/server/client";

import { Button } from "./button";
import MobileNav from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { Skeleton } from "./skeleton";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const { data: user, isLoading } = trpc.users.getMe.useQuery();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileNav />
      <div className="flex w-full justify-end gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="size-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isLoading ?
              <>
                <div className="px-2 py-1.5">
                  <Skeleton className="mb-1 h-4 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5">
                  <Skeleton className="h-4 w-16" />
                </div>
              </>
            : <>
                <DropdownMenuLabel>
                  {user?.username ?? "User"}
                  {user && (
                    <div className="mt-1 text-xs font-normal text-muted-foreground">
                      {user.email}
                    </div>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
