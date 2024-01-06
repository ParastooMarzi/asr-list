"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { fetchData } from '../../api';
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Play , FileVideo } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import PlayAudio from "./playAudio"
import Modal from "./ModalDetails";


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
    id: "actions",
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const people = row.original;
  
      const openModal = () => {
        setIsModalOpen(true);
      };
  
      const closeModal = () => {
        setIsModalOpen(false);
      };
  
      return (
        <>
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={openModal}>
            <span className="sr-only"><Play/></span>
            <FileVideo className="h-4 w-4" />
          </Button>
  
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            
          </Modal>
        </>
      );
    },
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