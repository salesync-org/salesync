import { ColumnDef } from '@tanstack/react-table';
import {Icon, Checkbox} from '@/components/ui';
import { Link } from 'react-router-dom';

export type Sale = {
  id: string;
  person: {
    id: string;
    name: string;
  };
  title: string;
  company: string;
  phone: string;
  email: string;
  leadStatus: string;
  ownerAlias: string;
};

export const columns: ColumnDef<Sale>[] = [
  {
    id: 'index',
    header: '',
    cell: ({ row }) => <span className='block w-full text-center'>{row.index + 1}</span>
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
    accessorKey: 'person',
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
      const person = row.getValue('person') as Sale['person'];
      return (
        <Link to={`/records/${person.id}`} className='block items-center align-middle w-full text-blue-500 hover:underline'>
          {person.name}
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
