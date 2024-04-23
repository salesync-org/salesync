import recordApi, { RecordsFilter } from '@/api/record';
import { useQuery } from 'react-query';

const useRecords = (
  companyName: string,
  typeId: string,
  recordFilter: RecordsFilter = {
    searchTerm: '',
    isAsc: null,
    propertyName: null,
    currentPage: 1,
    pageSize: 300
  }
) => {
  const key = ['records', typeId, recordFilter];
  const { data, error, isLoading } = useQuery(
    key,
    async () => {
      return recordApi.getRecords(companyName, typeId, recordFilter);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      refetchOnMount: 'always',
      keepPreviousData: true,
      enabled: !!typeId
    }
  );

  if (error) {
    console.error('Error fetching records:', error);
  }

  return { data, error, isLoading, key };
};
export default useRecords;
