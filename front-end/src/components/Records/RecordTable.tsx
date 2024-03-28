/* eslint-disable @typescript-eslint/no-explicit-any */
import { layoutColumns } from '@/constants/layout/columns/columns';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './data-table';
import useRecords from '@/hooks/record-service/useRecords';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import ErrorToaster from '@/pages/Error/ErrorToaster';
import { useParams } from 'react-router-dom';

interface RecordTableProps {
  typeId: string;
}

const RecordTable = ({ typeId }: RecordTableProps) => {
  const { companyName = '' } = useParams();
  const columns: ColumnDef<any, any>[] | undefined = layoutColumns
    .find((layout) => layout.id === typeId)
    ?.createColumn(companyName);
  const { data, isLoading } = useRecords(typeId);
  if (!columns) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return <ErrorToaster errorMessage='Error loading table ' />;
  }

  return <DataTable columns={columns} data={data.data} />;
};
export default RecordTable;
