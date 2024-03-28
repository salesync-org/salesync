import recordApi from '@/api/record';
import { useQuery } from 'react-query';

const useRecord = (recordId: string) => {
  const key = ['record', recordId];
  const { data, error, isLoading } = useQuery(
    key,
    async () => {
      return recordApi.getRecordDetails(recordId);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  if (error) {
    console.error('Error fetching records:', error);
  }

  return { data, error, isLoading, key };
};
export default useRecord;
