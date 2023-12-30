"use client";
import React from "react";
import { Button } from "../../components/ui/button";
import { Person } from "../../people";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomColumnDef<T> extends ColumnDef<T> {
  header?: React.ReactNode | ((args: { column: CustomColumnDef<T> }) => React.ReactNode);
  cell?: (args: { row: any }) => React.ReactNode;
}

export const columns: CustomColumnDef<Person>[] = [
  {
    header: "شماره مبدا",
    accessorKey: "source_number",
  },
  {
    header: "شماره مقصد",
    accessorKey: "des_number",
  },
  {
    header: "مدت زمان مکالمه",
    accessorKey: "call_duration",
  },
  {
    header: "تاریخ",
    accessorKey: "date",
  },
  {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        ردیف
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorKey: "id",
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const person = row.original as Person;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.source_number.toString());
              }}
            >
              Copy Source Number
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
