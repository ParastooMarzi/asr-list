"use client"
import React, { useState } from 'react';
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { downloadToExcel } from '@/lib/xlsx';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PeopleDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {


  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, any>>({});
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  console.log(rowSelection);

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
      {/* input */}
      <div className="flex items-center py-4 justify-end">
        <Input
         style={{ textAlign: 'right'}}
          placeholder="شماره مبدا"
          value={
            (table.getColumn('src')?.getFilterValue() as string) ||
            ''
          }
          onChange={(e) => {
            table.getColumn('src')?.setFilterValue(e.target.value);
          }}
          className="ml-4 w-120"
        />
        <Input
         style={{ textAlign: 'right' }}
          placeholder="تا تاریخ"
          value={
            (table.getColumn('date')?.getFilterValue() as string) ||
            ''
          }
          onChange={(e) => {
            table.getColumn('date')?.setFilterValue(e.target.value);
          }}
          className="ml-4 w-120"
        />
        <Input
         style={{ textAlign: 'right' }}
          placeholder="از تاریخ"
          value={
            (table.getColumn('date')?.getFilterValue() as string) ||
            ''
          }
          onChange={(e) => {
            table.getColumn('date')?.setFilterValue(e.target.value);
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
              .getAllColumns()
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

      {/* table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
   
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No results</TableCell>
              </TableRow>             
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div>
      <Pagination className='justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>

      
      
    </div>
  );
}

export default PeopleDataTable;
