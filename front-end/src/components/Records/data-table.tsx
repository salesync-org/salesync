import { SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/DataTable/table';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import NotFoundImage from '../NotFoundImage/NotFoundImage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DataTableProps<TData, _TValue> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });

  return (
    <div className='min-h-full overflow-scroll rounded-sm border-[1px] border-button-stroke dark:border-button-stroke-dark'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className='h-[40px] cursor-pointer bg-background-light transition-all dark:bg-background-dark'
            >
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'h-8 truncate border-r-[1px] font-semibold last:border-x-0 hover:bg-button-background-hover dark:hover:bg-button-background-hover-dark',
                      index === 0 && 'w-0',
                      index === 1 && 'w-12'
                    )}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className='group h-[40px] transition-all hover:bg-button-background-hover dark:hover:bg-button-background-hover-dark'
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      className='h-8 py-0 leading-5 transition-all hover:bg-secondary-light/40 dark:hover:bg-secondary-dark/40'
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 truncate text-center'>
                <NotFoundImage></NotFoundImage>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
