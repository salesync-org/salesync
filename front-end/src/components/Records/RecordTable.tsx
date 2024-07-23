/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecordsFilter } from '@/api/record';
import useRecords from '@/hooks/record-service/useRecords';
import { RecordsQueryResponse } from '@/hooks/record-service/useRecords';
import useProperties from '@/hooks/type-service/useProperties';
import { PropertiesQueryResponse } from '@/hooks/type-service/useProperties';
import ErrorToaster from '@/pages/Error/ErrorToaster';
import { createColumns } from '@/utils/createColumns';
import { formatRecords } from '@/utils/utils';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pagination, Skeleton } from '../ui';
import { DataTable } from './data-table';
import { Dispatch, SetStateAction } from 'react';

interface RecordTableProps {
  typeId: string;
  recordFilter: RecordsFilter;
  showPropertyIds?: string[];
  recordsQuery?: RecordsQueryResponse;
  propertiesQuery?: PropertiesQueryResponse;
  className?: string;
  setRecordFilter: Dispatch<SetStateAction<RecordsFilter>>;
}

const RecordTable = ({
  typeId,
  recordFilter,
  showPropertyIds,
  recordsQuery,
  propertiesQuery,
  setRecordFilter
}: RecordTableProps) => {
  const { companyName = '' } = useParams();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  if (!recordsQuery) {
    console.log('adssadasdas');
    recordsQuery = useRecords(companyName, typeId, recordFilter);
  }

  if (!propertiesQuery) {
    propertiesQuery = useProperties(companyName, typeId);
  }

  if (!recordsQuery || !propertiesQuery) {
    return <ErrorToaster errorMessage='Error loading table ' />;
  }

  console.log({ recordsQuery });

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

  const records = recordsQuery.data.records;
  const tableData = formatRecords(records);
  const columns = createColumns(companyName, tempPropertyData!.properties!, records);
  let totalPages = Math.ceil(recordsQuery?.data?.total_size / (recordFilter?.pageSize ?? 12)) ?? 1;

  if (recordsQuery?.data?.hits?.total?.value) {
    console.log('SASasa');
    totalPages = Math.ceil(recordsQuery.data.hits.total.value / (recordFilter?.pageSize ?? 12));
  }

  console.log({ totalPages, recordsQuery });

  return (
    <div className='h-full space-y-4 px-4 py-2'>
      <DataTable columns={columns} data={tableData} />
      <Pagination
        currentPage={+page}
        onPageChange={(page) =>
          setRecordFilter({
            ...recordFilter,
            currentPage: +page
          })
        }
        totalPages={totalPages}
      />
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
