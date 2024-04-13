/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecordsFilter } from '@/api/record';
import useRecords from '@/hooks/record-service/useRecords';
import useProperties from '@/hooks/type-service/useProperties';
import ErrorToaster from '@/pages/Error/ErrorToaster';
import { formatRecords } from '@/utils/utils';
import { Checkbox } from '@radix-ui/react-checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../ui';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { DataTable } from './data-table';
import { createColumns } from '@/utils/createColumns';

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
  console.log(recordData);
  const tableData = formatRecords(recordData.records);
  const columns = createColumns(companyName, propertyData!.properties);

  return <div className='px-4 py-2'>{<DataTable columns={columns} data={tableData} />}</div>;
};
export default RecordTable;
