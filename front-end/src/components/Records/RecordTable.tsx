/* eslint-disable @typescript-eslint/no-explicit-any */
import { layoutColumns } from '@/constants/layout/columns/columns';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './data-table';
import useRecords from '@/hooks/record-service/useRecords';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import ErrorToaster from '@/pages/Error/ErrorToaster';
import { Link, useParams } from 'react-router-dom';
import { RecordsFilter } from '@/api/record';
import { formatRecords } from '@/utils/utils';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Icon } from '../ui';
import useProperties from '@/hooks/type-service/useProperties';

interface RecordTableProps {
  typeId: string;
}

type Column = {
  id: string;
  Name: string;
  Title: string;
  Company: string;
  Phone: string;
  Email: string;
};

const columns: ColumnDef<Column>[] = [
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
    accessorKey: 'Name',
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
          to={`/record/${row.getValue('id')}`}
          className='block w-full items-center align-middle text-blue-500 hover:underline'
        >
          {row.getValue('Name')}
        </Link>
      );
    }
  },
  {
    accessorKey: 'Title',
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
    accessorKey: 'Company',
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
    accessorKey: 'Phone',
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
    accessorKey: 'Email',
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
    id: 'actions',
    header: '',
    cell: () => (
      <div className='m-1 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-[4px] border border-button-stroke dark:border-button-stroke-dark '>
        <Icon name='arrow_drop_down' size='32px' />
      </div>
    )
  }
];

const RecordTable = ({ typeId }: RecordTableProps) => {
  const { companyName = '' } = useParams();
  const recordFilter: RecordsFilter = {
    searchTerm: '',
    isAsc: false,
    propertyName: null,
    currentPage: 1,
    pageSize: 5
  };
  const { data: recordData, isLoading: isRecordLoading } = useRecords(companyName, typeId, recordFilter);
  const { data: propertyData, isLoading: isPropertyLoading } = useProperties(companyName, typeId);

  // if (!columns) {
  //   return null;
  // }

  if (isRecordLoading || isPropertyLoading) {
    return <LoadingSpinner />;
  }

  if (!recordData && !propertyData) {
    return <ErrorToaster errorMessage='Error loading table ' />;
  }
  const tableData = formatRecords(recordData.records);

  console.log({ propertyData });

  return <div className='px-4 py-2'>{<DataTable columns={columns} data={tableData} />}</div>;
};
export default RecordTable;
