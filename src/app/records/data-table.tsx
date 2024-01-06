"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker2';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { downloadToExcel } from '@/lib/xlsx';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Record {
  call_type: string;
  date: string;
  dst: string;
  duration: number;
  recordingfile: string;
  speaker: string;
  src: string;
  time: number;
  uniqueid: string;
}

interface DataTableProps {
  columns: ColumnDef<Record>[];
  data: Record[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, any>>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedDate, setSelectedDate] = useState(null);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  
  return (
    <div>
      <Button onClick={() => downloadToExcel()} style={{ marginBottom: '20px' }}>
        Excel
      </Button>

      <div className="flex items-center py-4 justify-end">
        {/* Persian Date Picker */}
        <DatePicker
          onChange={(value) => setSelectedDate(value)}
          value={selectedDate}
          isGregorian={false} // Set to false for Persian date
          placeholder="انتخاب تاریخ"
          style={{ backgroundColor: 'black', color: 'orange' }}
          
        />
        <Input
          style={{ textAlign: 'right'}}
          placeholder="شماره مبدا"
          onChange={(e) => {
            const column = table?.getColumn('src');
            if (column) {
              column.setFilterValue(e.target.value);
            }
          }}
          className="ml-4 w-120"
        />
        <Input
          style={{ textAlign: 'right'}}
          placeholder="شماره مقصد"
          onChange={(e) => {
            const column = table?.getColumn('dst');
            if (column) {
              column.setFilterValue(e.target.value);
            }
          }}
          className="ml-4 w-120"
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="ml-4">
              فیلترها
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              ?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) => {
                      column.toggleVisibility(!!value);
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle className="ml-4" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table
              ?.getHeaderGroups()
              .map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
          </TableHeader>

          <TableBody>
            {table
              ?.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!table?.getRowModel().rows.length && (
              <TableRow>
                <TableCell>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex-1 text-sm text-muted-foreground">
        {table?.getFilteredSelectedRowModel().rows.length} of{' '}
        {table?.getFilteredRowModel().rows.length} row(s) selected
      </div>

      <Pagination className='justify-end'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => table?.previousPage()} disabled={!table?.getCanPreviousPage()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => table?.nextPage()} disabled={!table?.getCanNextPage()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default DataTable;
