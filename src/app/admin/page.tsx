"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";

import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UsersTable from "@/components/users/user-table";
import { trpc } from "@/server/client";

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_ITEMS = 5;

function DashboardContent() {
  const router = useRouter();

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [totalItems, setTotalItems] = useQueryState(
    "totalItems",
    parseAsInteger.withDefault(DEFAULT_TOTAL_ITEMS),
  );

  const { data: admins, isLoading } = trpc.admin.getAdmins.useQuery({
    page: page < 1 ? DEFAULT_PAGE : page,
    totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
  });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>

      {isLoading ?
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">Loading...</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we fetch admin users.
            </p>
          </div>
        </div>
      : !admins || admins.items.length <= 0 ?
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No Admin Users Found
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start managing the system once you assign admin privileges
              to a user.
            </p>
            <Button
              onClick={() => router.push("/admin/users")}
              className="mt-4"
            >
              Manage Users
            </Button>
          </div>
        </div>
      : <>
          <Select
            defaultValue={DEFAULT_TOTAL_ITEMS.toString()}
            onValueChange={(value) => setTotalItems(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Total Items" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <UsersTable
            users={admins.items ?? []}
            isLoading={isLoading}
            totalPages={admins.totalPages}
            currentPage={page}
            onPageChange={(page) => setPage(page)}
          />
        </>
      }
    </main>
  );
}

export default function HomePage() {
  return (
    <div className="m-10 flex flex-1 flex-col">
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center">
            Loading...
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </div>
  );
}
