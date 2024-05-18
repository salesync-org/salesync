/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';
import Icon from '../../../components/ui/Icon/Icon';
import { Link } from 'react-router-dom';
import { Checkbox } from 'components/ui';
import { formatCurrency } from '@/utils/utils';

export type OpportunityColumns = {
  id: string;
  opportunityName: string;
  accountName: string;
  amount: number;
  closeDate: string;
  stage: string;
  opportunityOwnerAlias: string;
};

export const createTableLayout = (companyName: string): ColumnDef<OpportunityColumns>[] => {
  const opportunityColumns: ColumnDef<OpportunityColumns>[] = [
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
      accessorKey: 'opportunityName',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Opportunity Name</span>
          <Icon name='expand_more' />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Link
            to={`/${companyName}/record/${row.getValue('id')}`}
            className='block w-full items-center align-middle text-blue-500 hover:underline'
          >
            {row.getValue('opportunityName')}
          </Link>
        );
      }
    },
    {
      accessorKey: 'accountName',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Account Name</span>
          <Icon name='expand_more' />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Link
            to={`/${companyName}/record/${row.getValue('id')}`}
            className='block w-full items-center align-middle text-blue-500 hover:underline'
          >
            {row.getValue('accountName')}
          </Link>
        );
      }
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Amount</span>
          <Icon name='expand_more' />
        </div>
      ),
      cell: ({ row }) => {
        return <span>{formatCurrency(row.getValue('amount'))}</span>;
      }
    },
    {
      accessorKey: 'closeDate',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Close Date</span>
          <Icon name='expand_more' />
        </div>
      )
    },
    {
      accessorKey: 'stage',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Stage</span>
          <Icon name='expand_more' />
        </div>
      )
    },
    {
      accessorKey: 'opportunityOwnerAlias',
      header: ({ column }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className=''>Opportunity Owner Alias</span>
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
  return opportunityColumns;
};
