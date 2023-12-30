"use client";
import React from "react";
import { Button } from "../../components/ui/button";
import { Person } from "../../people";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Calendar, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomColumnDef<T> extends ColumnDef<T> {
  header?: React.ReactNode | ((args: { column: CustomColumnDef<T> }) => React.ReactNode);
  cell?: (args: { row: any }) => React.ReactNode;
}

export const columns: CustomColumnDef<Person>[] = [
  
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
    header: "مدت زمان مکالمه",
    accessorKey: "call_duration",
  },

  {
    header: "شماره مقصد",
    accessorKey: "des_number",
  },
   {
    header: "شماره مبدا",
    accessorKey: "source_number",
  },
  {
    header: "تاریخ",
    accessorKey: "date"
  },
  
  {
    header: ({ column }) => (
      <div>
        <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
        
      >
        ردیف
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>

      </div>
      
    ),
    accessorKey: "id",
    
  },
];
