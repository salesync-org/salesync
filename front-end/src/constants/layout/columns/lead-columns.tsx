/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';
import Icon from '../../../components/ui/Icon/Icon';
import { Link } from 'react-router-dom';
import { Checkbox } from 'components/ui';

export type LeadColumns = {
  id: string;
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  leadStatus: string;
  ownerAlias: string;
};

export const createTableLayout = (companyName: string) => {
  const leadColumns: ColumnDef<LeadColumns>[] = [
    {
      accessorKey: 'id',
      header: '',
      cell: () => <span></span>
    },
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          className='grid place-content-center rounded-[2px]'
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className='grid place-content-center rounded-[2px]'
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Name</span>
          <Icon name='expand_more' />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Link
            to={`/${companyName}/record/${row.getValue('id')}`}
            className='block w-full items-center align-middle text-blue-500 hover:underline'
          >
            {row.getValue('name')}
          </Link>
        );
      }
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Title</span>
          <Icon name='expand_more' />
        </div>
      )
    },
    {
      accessorKey: 'company',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Company</span>
          <Icon name='expand_more' />
        </div>
      )
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Phone</span>
          <Icon name='expand_more' />
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Email</span>
          <Icon name='expand_more' />
        </div>
      )
    },
    {
      accessorKey: 'leadStatus',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Lead Status</span>
          <Icon name='expand_more' />
        </div>
      )
    },
    {
      accessorKey: 'ownerAlias',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Owner Alias</span>
          <Icon name='expand_more' />
        </div>
      )
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <div className='flex aspect-square w-8 cursor-pointer items-center justify-center rounded-[4px] border'>
          <Icon name='arrow_drop_down' size='32px' />
        </div>
      )
    }
  ];
  return leadColumns;
};
