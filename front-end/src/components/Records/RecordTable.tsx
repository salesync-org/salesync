/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecordsFilter } from '@/api/record';
import useRecords from '@/hooks/record-service/useRecords';
import { RecordsQueryResponse } from '@/hooks/record-service/useRecords';
import useProperties from '@/hooks/type-service/useProperties';
import { PropertiesQueryResponse } from '@/hooks/type-service/useProperties';
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
  recordsQuery?: RecordsQueryResponse;
  propertiesQuery?: PropertiesQueryResponse;
  className?: string;
}

const RecordTable = ({ typeId, recordFilter, showPropertyIds, recordsQuery, propertiesQuery }: RecordTableProps) => {
  const { companyName = '' } = useParams();

  if (!recordsQuery) {
    recordsQuery = useRecords(companyName, typeId, recordFilter);
  }

  if (!propertiesQuery) {
    propertiesQuery = useProperties(companyName, typeId);
  }

  if (!recordsQuery || !propertiesQuery) {
    return <ErrorToaster errorMessage='Error loading table ' />;
  }

  if (recordsQuery.isLoading || propertiesQuery.isLoading || recordsQuery.isRefetching) {
    return <RecordTableSkeleton />;
  }
  if (!recordsQuery.data || !propertiesQuery.data) {
    return <ErrorToaster errorMessage='Error loading table ' />;
  }
  const tempPropertyData = JSON.parse(JSON.stringify(propertiesQuery.data));

  if (showPropertyIds) {
    const filteredProperties = tempPropertyData!.properties!.filter((property: any) =>
      showPropertyIds.includes(property.id)
    );
    tempPropertyData!.properties = filteredProperties;
  }

  console.log(recordsQuery);

  const records = recordsQuery.data.records;
  const tableData = formatRecords(records);
  const columns = createColumns(companyName, tempPropertyData!.properties!, records);

  return (
    <div className='h-full px-4 py-2'>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
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
