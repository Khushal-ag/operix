"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { parseAsInteger, useQueryState } from "nuqs";

import type { User } from "@/types";

import { Input } from "@/components/ui/input";
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

type UsersResponse = {
  items: User[] | null;
  totalPages: number;
};

function UsersContent() {
  const searchParams = useSearchParams();

  const [currentSearch, setCurrentSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [totalItems, setTotalItems] = useQueryState(
    "totalItems",
    parseAsInteger.withDefault(DEFAULT_TOTAL_ITEMS),
  );

  const search = searchParams.get("search") ?? "";

  const { data, isLoading } = trpc.users.getAll.useQuery({
    page: page < 1 ? DEFAULT_PAGE : page,
    totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
    search,
  });

  const users: UsersResponse = {
    items: data?.items ?? [],
    totalPages: data?.totalPages ?? 1,
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full justify-between gap-3">
        <div>
          <Input
            value={currentSearch}
            placeholder="Search"
            onChange={(e) => setCurrentSearch(e.target.value)}
          />
        </div>

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
      </div>
      <UsersTable
        users={users.items ?? []}
        isLoading={isLoading}
        totalPages={users.totalPages}
        currentPage={page}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}

export default function Users() {
  return (
    <div className="m-10">
      <Suspense fallback={<div>Loading...</div>}>
        <UsersContent />
      </Suspense>
    </div>
  );
}
