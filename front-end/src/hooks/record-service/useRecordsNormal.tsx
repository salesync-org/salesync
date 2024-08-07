import recordApi, { RecordsFilter } from '@/api/record';
import { useQuery } from 'react-query';

export type RecordsQueryResponse = {
  data: any;
  error: any;
  isLoading: any;
  isRefetching: any;
  key: any;
  refetch: any;
};

const useRecordsNormal = (
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
  const key = ['recordsNormal', typeId, recordFilter];
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    key,
    async () => {
      return recordApi.getRecordsNormal(companyName, typeId, recordFilter);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      refetchOnMount: 'always',
      enabled: !!typeId
    }
  );

  if (error) {
    console.error('Error fetching records:', error);
  }

  const returnResponse: RecordsQueryResponse = { data, error, isLoading, isRefetching, key, refetch };
  return returnResponse;
};
export default useRecordsNormal;
