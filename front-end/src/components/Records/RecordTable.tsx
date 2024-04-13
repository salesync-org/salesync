/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecordsFilter } from '@/api/record';
import useRecords from '@/hooks/record-service/useRecords';
import useProperties from '@/hooks/type-service/useProperties';
import ErrorToaster from '@/pages/Error/ErrorToaster';
import { createColumns } from '@/utils/createColumns';
import { formatRecords } from '@/utils/utils';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
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
