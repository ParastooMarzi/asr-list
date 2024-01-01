"use client";
import React from "react";
import { Button } from "../../components/ui/button";
import { Person } from "../../people";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Calendar, MoreHorizontal, Play } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import PlayAudio from "@/app/people/playAudio";


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
    header: "جزئیات تماس",
    accessorKey: "recordingfile",
    cell: ({ row }) => (
      <PlayAudio/>
    
    ),
  },
  {
    header: "مدت زمان مکالمه",
    accessorKey: "duration",
  },

  {
    header: "شماره مقصد",
    accessorKey: "dst",
  },
   {
    header: "شماره مبدا",
    accessorKey: "src",
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
