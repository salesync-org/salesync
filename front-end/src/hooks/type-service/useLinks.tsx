import linkApi from '@/api/link';
import { useQuery } from 'react-query';

const useLink = (typeId: string) => {
  const key = ['links', typeId];
  const { data, error, isLoading } = useQuery<TypeRelation[]>(
    key,
    async () => {
      return linkApi.getAllLink(typeId);
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
export default useLink;
