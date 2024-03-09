import { ColumnDef } from '@tanstack/react-table';
import Icon from '../ui/Icon/Icon';
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
    cell: ({ row }) => <span className='block w-full text-center text-[13px]'>{row.index + 1}</span>
  },
  {
    accessorKey: 'person',
    header: ({ column }) => (
      <div
        className='flex items-center justify-between'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span className='text-[13px]'>Name</span>
        <Icon name='expand_more' />
      </div>
    ),
    cell: ({ row }) => {
      const person = row.getValue('person') as Sale['person'];
      return (
        <Link to={`/records/${person.id}`} className='block w-full text-blue-500 hover:underline'>
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
        <span className='text-[13px]'>Title</span>
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
        <span className='text-[13px]'>Company</span>
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
        <span className='text-[13px]'>Phone</span>
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
        <span className='text-[13px]'>Email</span>
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
        <span className='text-[13px]'>Lead Status</span>
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
        <span className='text-[13px]'>Owner Alias</span>
        <Icon name='expand_more' />
      </div>
    )
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <div className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-[4px] border'>
        <Icon name='arrow_drop_down' size='32px' />
      </div>
    )
  }
];
