import fieldApi from '@/api/fieldApi';
import { useQuery } from 'react-query';

const useField = (typeId: string) => {
  const key = ['property', typeId];
  const { data, error, isLoading } = useQuery<Field[]>(
    key,
    async () => {
      return fieldApi.getAllFields(typeId);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  if (error) {
    console.error('Error fetching links:', error);
  }

  return { data, error, isLoading, key };
};
export default useField;
