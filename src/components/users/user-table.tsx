"use client";

import React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const UsersTable = ({
  users,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
}: UsersTableProps) => {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden sm:table-cell">Username</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell width={"40%"}>
                    <Skeleton className="rounded-xl bg-gray-400/30 p-5"></Skeleton>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="rounded-xl bg-gray-400/30 p-5"></Skeleton>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="rounded-xl bg-gray-400/30 p-5"></Skeleton>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="rounded-xl bg-gray-400/30 p-5"></Skeleton>
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="hidden md:inline">
                    <div className="text-sm text-muted-foreground">
                      {user.id}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {user.username}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(user.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
              </PaginationItem>
            )}

            {/* First page */}
            {currentPage > 3 && (
              <PaginationItem>
                <Button variant="outline" onClick={() => onPageChange(1)}>
                  1
                </Button>
              </PaginationItem>
            )}

            {/* Ellipsis if needed */}
            {currentPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Pages around current page */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              // Only show pages nearby current page
              if (
                (pageNumber === 1 && currentPage <= 3) ||
                (pageNumber === totalPages && currentPage >= totalPages - 2) ||
                Math.abs(pageNumber - currentPage) < 2
              ) {
                return (
                  <PaginationItem key={index}>
                    <Button
                      variant={
                        pageNumber === currentPage ? "default" : "outline"
                      }
                      onClick={() => onPageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  </PaginationItem>
                );
              }
              return null;
            })}

            {/* Ellipsis if needed */}
            {currentPage < totalPages - 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Last page */}
            {currentPage < totalPages - 2 && totalPages > 3 && (
              <PaginationItem>
                <Button
                  variant="outline"
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            )}

            {currentPage < totalPages && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default UsersTable;
