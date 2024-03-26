import recordApi from '@/api/record';
import { useQuery } from 'react-query';

const useRecords = (typeId: string) => {
  const key = ['records', typeId];
  const { data, error, isLoading } = useQuery(
    key,
    async () => {
      return recordApi.getRecords(typeId);
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
export default useRecords;
