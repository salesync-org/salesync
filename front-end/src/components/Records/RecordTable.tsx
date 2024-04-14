/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecordsFilter } from '@/api/record';
import useRecords from '@/hooks/record-service/useRecords';
import useProperties from '@/hooks/type-service/useProperties';
import ErrorToaster from '@/pages/Error/ErrorToaster';
import { createColumns } from '@/utils/createColumns';
import { formatRecords } from '@/utils/utils';
import { useParams } from 'react-router-dom';
import { Skeleton } from '../ui';
import { DataTable } from './data-table';

interface RecordTableProps {
  typeId: string;
}

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

  if (isRecordLoading || isPropertyLoading) {
    return <RecordTableSkeleton />;
  }

  if (!recordData && !propertyData) {
    return <ErrorToaster errorMessage='Error loading table ' />;
  }

  const tableData = formatRecords(recordData.records);
  const columns = createColumns(companyName, propertyData!.properties);

  return <div className='px-4 py-2'>{<DataTable columns={columns} data={tableData} />}</div>;
};

const RecordTableSkeleton = () => {
  const height = '20px';
  const borderRadius = '4px';
  return (
    <div className='space-y-1 px-4 py-2'>
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-400 dark:bg-slate-200' />
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-200 dark:bg-slate-600' />
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-200 dark:bg-slate-600' />
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-200 dark:bg-slate-600' />
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-200 dark:bg-slate-600' />
    </div>
  );
};

export default RecordTable;
