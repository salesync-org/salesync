import relationApi from '@/api/relation';
import { useQuery } from 'react-query';

const useRelation = () => {
  const key = ['relations'];
  const { data, error, isLoading } = useQuery<Relation[]>(
    key,
    async () => {
      return relationApi.getAllRelations();
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  if (error) {
    console.error('Error fetching relations:', error);
  }

  return { relations: data, error, isLoading, key };
};
export default useRelation;
