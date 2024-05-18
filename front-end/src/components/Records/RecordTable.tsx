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
  recordFilter?: RecordsFilter;
  showPropertyIds?: string[];
  className?: string;
}

const RecordTable = ({ typeId, recordFilter, showPropertyIds }: RecordTableProps) => {
  const { companyName = '' } = useParams();

  const { data: recordData, isLoading: isRecordLoading } = useRecords(companyName, typeId, recordFilter);
  const { data: propertyData, isLoading: isPropertyLoading } = useProperties(companyName, typeId);
  if (isRecordLoading || isPropertyLoading) {
    return <RecordTableSkeleton />;
  }

  if (!recordData && !propertyData) {
    return <ErrorToaster errorMessage='Error loading table ' />;
  }

  const tempPropertyData = JSON.parse(JSON.stringify(propertyData));

  if (showPropertyIds) {
    const filteredProperties = tempPropertyData!.properties!.filter((property: any) =>
      showPropertyIds.includes(property.id)
    );
    tempPropertyData!.properties = filteredProperties;
  }

  const records = recordData.records;
  const tableData = formatRecords(records);
  const columns = createColumns(companyName, tempPropertyData!.properties!, records);

  return <div className='h-full px-4 py-2'>{<DataTable columns={columns} data={tableData} />}</div>;
};

export const RecordTableSkeleton = () => {
  const height = '40px';
  const borderRadius = '4px';
  return (
    <div className='min-w-[300px] space-y-1 px-4 py-2'>
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-400 dark:bg-slate-200' />
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-200 dark:bg-slate-600' />
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-200 dark:bg-slate-600' />
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-200 dark:bg-slate-600' />
      <Skeleton width='100%' height={height} borderRadius={borderRadius} className='bg-slate-200 dark:bg-slate-600' />
    </div>
  );
};

export default RecordTable;
